// main.js
// 毕业季模拟器主逻辑
// 功能：
// 1）驱动主时间线周事件 weekEvents；
// 2）根据好感度触发关键事件 keyEvents（告白 / 分手）；
// 3）根据状态随机触发暧昧事件 ambiguousEvents、恋爱事件 romanticEvents、导师事件 advisorEvents；
// 4）根据 timedEvents.afterWeek 在某些主线事件后触发“定时事件”（例如企业宣讲会）。
// 5）新增：根据数值触发三个坏结局 + 一个好结局。

// ===================== 全局状态与常量 =====================

// 整体游戏状态
let state;                     // 数值、路线、恋爱状态等
let currentWeekIndex = 0;      // 已进行的周事件数量（按 window.weekEvents 顺序推进）
let currentEventType = null;   // 当前事件类型，见 EVENT_TYPE
let gameEnded = false;

// 标志位：关键事件只触发一次
const flags = {
    mKeyDone: false,   // 告白事件是否已触发
    sKey1Done: false   // 分手事件是否已触发
};

// 事件类型枚举
const EVENT_TYPE = {
    WEEK: "week",
    KEY_M: "mKey",
    KEY_S1: "sKey1",
    AMBIG: "ambiguous",
    ROMANTIC: "romantic",
    ADVISOR: "advisor",
    TIMED: "timed"
};

// 需要跟踪并展示变化的数值字段
const TRACKED_STATS = [
  "energy",
  "stress",
  "advisor",
  "thesis",
  "vertical",
  "horizontal",
  "civil",
  "industry",
  "institute",
  "faculty",
  "TaAffection"
];

// 状态名 -> 中文标签
const STAT_LABELS = {
    energy: "精力",
    stress: "压力",
    advisor: "导师信任度",
    thesis: "大论文",
    vertical: "纵向项目",
    horizontal: "横向项目",
    civil: "考公线",
    industry: "大厂线",
    institute: "研究所线",
    faculty: "教职线",
    TaAffection: "Ta好感度"
};

// 结局配置
const ENDINGS = {
    GOOD: {
        title: "Good 结局：顺利毕业",
        description:
          "你撑到了最后，也完成了论文和各项流程。无论最终去了考公、大厂、研究所还是教职，至少“毕业”这一条主线被你稳稳拿下。剩下的，是一段新的旅程。"
    },
    BAD_GUIDE: {
        title: "Bad 结局：导师信任度归零，毕业无望",
        description:
          "一次次失约、拖延和糊弄之后，导师终于摊牌：现有进度不足以支撑你按时毕业，推荐信也无从谈起。这一年像是被按下了暂停键，你不得不面对“从头再来”的选项。"
    },
    BAD_STRESS: {
        title: "Bad 结局：压力爆表，人崩溃了",
        description:
          "你试图同时抓住所有路线：论文、横向、考公、秋招、感情、家庭……直到有一天身体和情绪先一步崩溃，医院的病床和心理咨询室成了新的“必修课”。系统判定：需要长时间休整。"
    },
    BAD_ENERGY: {
        title: "Bad 结局：精力被透支，彻底躺平",
        description:
          "你长时间透支自己，却很少认真补充。熬夜、内耗和瞎忙让精力条一路见底。某个清晨你醒来，发现自己对论文、考试和未来都提不起兴趣，只想关掉一切，再也不起身。毕业，这次没有发生。"
    }
};

// ===================== 初始化入口 =====================

window.addEventListener("load", () => {
    initState();
renderStatus();
logMessage("游戏已初始化，点击“开始游戏”按钮进入第一阶段。");

    const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", () => {
        if (currentWeekIndex > 0 || gameEnded) return;

    startBtn.disabled = true;
        const intro = document.getElementById("introCard");
    if (intro) intro.style.display = "none";

    document.getElementById("eventTitle").textContent = "加载事件中……";
    document.getElementById("eventDescription").textContent = "";
    document.getElementById("choices").innerHTML = "";

    startNextMainEvent();
});
}
});

// ===================== 状态初始化 =====================

// 随机初始化各条数值线 & 恋爱状态
function initState() {
    state = {
        energy: randInt(40, 80),
        stress: randInt(10, 60),
        advisor: randInt(30, 80),
        thesis: randInt(0, 20),
        vertical: randInt(10, 40),
        horizontal: randInt(10, 40),
        civil: randInt(0, 100),
        industry: 0,
        institute: 0,
        faculty: 0,
        // 毕业去向状态：none/civil/industry/institute/faculty
        jobStatus: "none"
    };

    // 随机决定是否一开始就在一起
    if (Math.random() < 0.5) {
        state.isDating = false;
        state.TaAffection = randInt(20, 70);
        state.relationStatus = "single"; // 暧昧 / 单身
        logMessage("开局：你目前是单身/暧昧状态。");
    } else {
        state.isDating = true;
        state.TaAffection = randInt(40, 90);
        state.relationStatus = "dating"; // 已在一起
        logMessage("开局：你已经和Ta在一起了。");
    }

    clampState();
}

// ===================== 主事件选择（周事件 + 关键事件） =====================

// 选择下一条要播放的“主线”事件：
// 1）优先检查关键事件（告白 / 分手）
// 2）否则播放下一条 weekEvents 主线事件（当前 index）
// 3）全部结束则进入结局判定
function startNextMainEvent() {
    if (gameEnded || currentEventType) return;

    const weeks = window.weekEvents;
    if (!Array.isArray(weeks) || weeks.length === 0) {
        alert("事件表未加载成功，请确认 events.js 是否在同一目录并被 index.html 正确引用。");
        logMessage("错误：weekEvents 未定义或为空，检查 events.js。");
        return;
    }

    let ev = null;
    let type = null;

    // ---------- 关键事件：告白 / 分手 ----------
    if (currentWeekIndex > 0 && state.relationStatus !== "broken") {
        const keys = window.keyEvents || {};
        if (!state.isDating && state.TaAffection >= 60 && !flags.mKeyDone && keys.mKey) {
            ev = keys.mKey;
            type = EVENT_TYPE.KEY_M;
        } else if (state.isDating && state.TaAffection < 60 && !flags.sKey1Done && keys.sKey1) {
            ev = keys.sKey1;
            type = EVENT_TYPE.KEY_S1;
        }
    }

    // ---------- 普通主线事件 ----------
    if (!ev) {
        if (currentWeekIndex < weeks.length) {
            ev = weeks[currentWeekIndex];
            type = EVENT_TYPE.WEEK;
            currentWeekIndex++;
        } else {
            endGame();
            return;
        }
    }

    presentEvent(ev, type);
}

// ===================== 事件展示与结算 =====================

// 在界面上绘制一个事件及其选项
function presentEvent(ev, type) {
    currentEventType = type;

    const titleEl = document.getElementById("eventTitle");
    const descEl  = document.getElementById("eventDescription");
    const choicesEl = document.getElementById("choices");

    titleEl.textContent = ev.title || "";
    descEl.textContent  = ev.description || "";
    choicesEl.innerHTML = "";

    (ev.choices || []).forEach(choice => {
        const btn = document.createElement("button");
    btn.textContent = choice.text || "";
    btn.addEventListener("click", () => handleChoice(ev, choice));
    choicesEl.appendChild(btn);
});
}

// 处理一次选项：修改状态 → 展示反馈与数值变化 → 等待“确认”
function handleChoice(ev, choice) {
    if (gameEnded) return;

    const finishedType = currentEventType;
    const before = snapshotState();

    applyEffects(choice.effects);

    // 关键事件额外处理恋爱状态
    if (finishedType === EVENT_TYPE.KEY_M) {
        flags.mKeyDone = true;
        if (choice.effects && choice.effects.setIsDating === true) {
            state.isDating = true;
            state.relationStatus = "dating";
            logMessage("你们正式成为对象。");
        } else if (choice.effects && choice.effects.setTaAffection !== undefined) {
            state.relationStatus = "single";
            logMessage("这次告白没有成为恋人，关系回落到暧昧/普通同学。");
        }
    } else if (finishedType === EVENT_TYPE.KEY_S1) {
        flags.sKey1Done = true;
        if (choice.effects && choice.effects.setIsDating === false) {
            state.isDating = false;
            state.relationStatus = "broken";
            state.TaAffection = 0;
            logMessage("这段关系在高压毕业季中画上了句号。");
        } else {
            state.isDating = true;
            state.relationStatus = "dating";
            logMessage("你选择再努努力挽回这段关系。");
        }
    }

    clampState();
    renderStatus();

    const changes = buildChangeList(before, state);

    const descEl  = document.getElementById("eventDescription");
    const choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";

    // ---------- 构造“属性变化”说明 ----------
    let changesHtml = "";
    if (changes.length === 0) {
        changesHtml = "<div>本回合属性未发生变化。</div>";
    } else {
        changesHtml = "<div>本回合属性变化：</div><ul style=\"margin-top:4px; padding-left:18px;\">";
        changes.forEach(ch => {
            const sign = ch.delta > 0 ? "+" + ch.delta : ch.delta.toString();
        changesHtml += `<li>${ch.label}：${ch.oldValue} → ${ch.newValue}（${sign}）</li>`;
    });
    changesHtml += "</ul>";
}

// ---------- 按当前状态选一条反馈 ----------
    const feedbackText = pickFeedbackText(choice, before, state).trim();
let feedbackHtml = "";
if (feedbackText) {
    feedbackHtml =
      `<div style="margin-top:6px; color:#1d4ed8;">
         <strong>${escapeHtml(feedbackText)}</strong>
       </div>`;
}

// 最终事件说明：上半部分是“你选择了xxx”，中间是反馈，下半部分是属性变化
descEl.innerHTML =
  `<div>你选择了：${escapeHtml(choice.text || "")}</div>` +
  `<div style="margin-top:6px;"></div>` +
feedbackHtml +
`<div style="margin-top:6px;"></div>` +
changesHtml;

logMessage(`【${ev.title}】你选择了：${choice.text}`);

    const confirmBtn = document.createElement("button");
confirmBtn.textContent = "确认，进入下一事件";
confirmBtn.addEventListener("click", () => onEventFinished(finishedType, ev));
choicesEl.appendChild(confirmBtn);

currentEventType = null;
}

// 事件完整结束（玩家点“确认”）后的调度逻辑
function onEventFinished(finishedType, ev) {
    if (gameEnded) return;

    const titleEl = document.getElementById("eventTitle");
    const descEl  = document.getElementById("eventDescription");
    const choicesEl = document.getElementById("choices");

    titleEl.textContent = (ev.title || "") + " —— 已结束";
    descEl.textContent  = "正在切换到下一事件……";
    choicesEl.innerHTML = "";

    // 留一点间隔，让玩家有“切换场景”的感觉
    setTimeout(() => {
        if (gameEnded) return;

    // 事件结束后先检查是否触发 Bad 结局
        const badId = checkBadEnding();
    if (badId) {
        showEnding(badId);
        return;
    }

    if (finishedType === EVENT_TYPE.WEEK) {
        const weekId = ev.id;

        // 1）先检查该主线后的“定时事件”（如企业宣讲会）
        if (triggerTimedEventAfterWeek(weekId)) return;

        // 2）然后尝试情感/导师随机事件
        if (tryStartLoveEvent()) return;
        if (tryStartAdvisorEvent()) return;

        // 3）都没有则回到下一条主线事件
        startNextMainEvent();
        return;
    }

    if (finishedType === EVENT_TYPE.TIMED) {
        // 定时事件结束后，继续尝试情感/导师随机，然后回主线
        if (tryStartLoveEvent()) return;
        if (tryStartAdvisorEvent()) return;
        startNextMainEvent();
        return;
    }

    // 暧昧 / 恋爱 / 导师随机 / 关键事件结束后，直接回主线
    if (
      finishedType === EVENT_TYPE.AMBIG ||
      finishedType === EVENT_TYPE.ROMANTIC ||
      finishedType === EVENT_TYPE.ADVISOR ||
      finishedType === EVENT_TYPE.KEY_M ||
      finishedType === EVENT_TYPE.KEY_S1
    ) {
        startNextMainEvent();
        return;
    }

    // 兜底：任何未知类型也直接回主线
    startNextMainEvent();
}, 260);
}

// ===================== 定时事件（timedEvents.afterWeek） =====================

// 在某一主线事件结束后，根据 timedEvents.afterWeek 触发额外事件。
function triggerTimedEventAfterWeek(weekId) {
    const root = window.timedEvents;
    if (!root || !root.afterWeek) return false;

    const list = root.afterWeek[weekId];
    if (!Array.isArray(list) || list.length === 0) return false;

    const ev = list.shift(); // 每次只取一个
    if (!ev) return false;

    logMessage(`【定时事件】${ev.title}`);
presentEvent(ev, EVENT_TYPE.TIMED);
return true;
}

// ===================== 暧昧 / 恋爱 / 导师随机事件 =====================

// 根据当前恋爱状态选择可能触发的事件池
function tryStartLoveEvent() {
    if (state.relationStatus === "single") {
        return tryStartAmbiguousEvent();
    } else if (state.relationStatus === "dating") {
        return tryStartRomanticEvent();
    }
    return false;
}

// 暧昧事件：仅在 single 且好感度>10 时，根据好感度决定触发概率
function tryStartAmbiguousEvent() {
    if (state.relationStatus !== "single") return false;
    if (!Array.isArray(window.ambiguousEvents) || window.ambiguousEvents.length === 0) return false;
    if (state.TaAffection < 10) return false;

    const aff = clamp01(state.TaAffection / 100);
    let p = 0.15 + 0.5 * aff; // 15% ~ 65%
    if (p > 0.65) p = 0.65;

    if (Math.random() > p) return false;

    const idx = Math.floor(Math.random() * window.ambiguousEvents.length);
    const ev = window.ambiguousEvents[idx];

    logMessage(`【触发暧昧事件】${ev.title}`);
presentEvent(ev, EVENT_TYPE.AMBIG);
return true;
}

// 恋爱事件：仅在 dating 且好感度>20 时，根据好感度决定触发概率
function tryStartRomanticEvent() {
    if (state.relationStatus !== "dating") return false;
    if (!Array.isArray(window.romanticEvents) || window.romanticEvents.length === 0) return false;
    if (state.TaAffection < 20) return false;

    const aff = clamp01(state.TaAffection / 100);
    let p = 0.10 + 0.5 * aff; // 10% ~ 60%
    if (p > 0.60) p = 0.60;

    if (Math.random() > p) return false;

    const idx = Math.floor(Math.random() * window.romanticEvents.length);
    const ev = window.romanticEvents[idx];

    logMessage(`【触发恋爱事件】${ev.title}`);
presentEvent(ev, EVENT_TYPE.ROMANTIC);
return true;
}

// 导师随机事件：导师好感度越高，越可能被安排任务
function tryStartAdvisorEvent() {
    if (!Array.isArray(window.advisorEvents) || window.advisorEvents.length === 0) return false;
    if (state.advisor < 20) return false;

    const adv = clamp01(state.advisor / 100);
    let p = 0.10 + 0.40 * adv; // 10% ~ 50%
    if (p > 0.50) p = 0.50;

    if (Math.random() > p) return false;

    const idx = Math.floor(Math.random() * window.advisorEvents.length);
    const ev = window.advisorEvents[idx];

    logMessage(`【触发导师事件】${ev.title}`);
presentEvent(ev, EVENT_TYPE.ADVISOR);
return true;
}

// ===================== 反馈选择逻辑 =====================

// 根据当前状态，在一个选项的多种反馈里选一条：
// 优先使用 choice.feedbackByState（数组），其次是 choice.feedback（字符串），最后允许 feedback 函数。
function pickFeedbackText(choice, beforeState, afterState) {
    if (!choice) return "";

    // 1）数据驱动：feedbackByState = [{ conditions: {...}, text: "..." }, ...]
    if (Array.isArray(choice.feedbackByState)) {
        for (const rule of choice.feedbackByState) {
            if (!rule || typeof rule.text !== "string") continue;
            const cond = rule.conditions || {};
    if (matchSimpleConditions(cond, beforeState, afterState)) {
        return rule.text;
    }
}
}

// 2）兼容原来的写法：固定字符串 feedback
if (typeof choice.feedback === "string") {
    return choice.feedback;
}

// 3）可选：feedback 也可以是一个函数 (beforeState, afterState) => string
if (typeof choice.feedback === "function") {
    try {
        const res = choice.feedback(beforeState, afterState);
        if (typeof res === "string") return res;
    } catch (e) {
        console.error("feedback 函数执行出错：", e);
    }
}

return "";
}

// 简单条件判断：目前按“事件前”的状态判断
// 支持字段：energyMin/Max, stressMin/Max, advisorMin/Max, TaAffectionMin/Max,
// 以及 thesisMin/Max, verticalMin/Max, horizontalMin/Max, civilMin/Max, industryMin/Max 等。
function matchSimpleConditions(cond, before, after) {
    const s = before || {};

    const checkRange = (statKey, minKey, maxKey) => {
        if (cond[minKey] !== undefined && s[statKey] < cond[minKey]) return false;
    if (cond[maxKey] !== undefined && s[statKey] > cond[maxKey]) return false;
    return true;
};

if (!checkRange("energy", "energyMin", "energyMax")) return false;
if (!checkRange("stress", "stressMin", "stressMax")) return false;
if (!checkRange("advisor", "advisorMin", "advisorMax")) return false;
if (!checkRange("TaAffection", "TaAffectionMin", "TaAffectionMax")) return false;
if (!checkRange("thesis", "thesisMin", "thesisMax")) return false;
if (!checkRange("vertical", "verticalMin", "verticalMax")) return false;
if (!checkRange("horizontal", "horizontalMin", "horizontalMax")) return false;
if (!checkRange("civil", "civilMin", "civilMax")) return false;
if (!checkRange("industry", "industryMin", "industryMax")) return false;
if (!checkRange("institute", "instituteMin", "instituteMax")) return false;
if (!checkRange("faculty", "facultyMin", "facultyMax")) return false;

return true;
}

// ===================== 数值与展示工具 =====================

// 复制当前状态，用于之后对比“属性变化”
function snapshotState() {
    const snap = {};
    TRACKED_STATS.forEach(k => {
        const v = state && typeof state[k] === "number" ? state[k] : 0;
    snap[k] = v;
});
return snap;
}

// 将前后状态对比，生成用于展示的“变化列表”
function buildChangeList(before, after) {
    const list = [];
    TRACKED_STATS.forEach(k => {
        const oldV = before[k] ?? 0;
        const newV = after[k] ?? 0;
    if (oldV !== newV) {
        list.push({
            key: k,
            label: STAT_LABELS[k] || k,
            oldValue: oldV,
            newValue: newV,
            delta: newV - oldV
        });
    }
});
return list;
}

// 按 effects 规则修改 state
function applyEffects(effects) {
    if (!effects) return;

    for (const key in effects) {
        const val = effects[key];

        // 1）直接加减的数值
        if (TRACKED_STATS.includes(key)) {
            if (key === "TaAffection" && state.relationStatus === "broken") {
                continue; // 分手后不再改变好感度
            }
            if (typeof state[key] !== "number") state[key] = 0;
            state[key] += val;
            continue;
        }

        // 2）特殊控制字段
        if (key === "setIsDating") {
            state.isDating = !!val;
            continue;
        }

        if (key === "setTaAffection") {
            if (state.relationStatus !== "broken") {
                state.TaAffection = val;
            }
            continue;
        }

        if (key === "clampTaMin") {
            if (typeof state.TaAffection !== "number") state.TaAffection = 0;
            if (state.relationStatus !== "broken" && state.TaAffection < val) {
                state.TaAffection = val;
            }
            continue;
        }
    }
}

// 将所有跟踪数值限制在 [0, 100]，避免越界
function clampState() {
    TRACKED_STATS.forEach(k => {
        let v = state[k];
    if (typeof v !== "number") return;
    if (v < 0) v = 0;
    if (v > 100) v = 100;
    state[k] = v;
});
}

// ===================== 结局判定 =====================

// 三个坏结局触发条件：
// 1）导师信任度 <= 0 → BAD_GUIDE
// 2）压力 >= 100      → BAD_STRESS
// 3）精力 <= 0        → BAD_ENERGY
function checkBadEnding() {
    if (!state) return null;
    if (state.advisor <= 0) {
        return "BAD_GUIDE";
    }
    if (state.stress >= 100) {
        return "BAD_STRESS";
    }
    if (state.energy <= 0) {
        return "BAD_ENERGY";
    }
    return null;
}

// 最终结局：若未触发 Bad，则统一视为 Good 结局
function checkFinalEnding() {
    const badId = checkBadEnding();
    if (badId) return badId;
    return "GOOD";
}

// 展示结局
function showEnding(endingId) {
    if (gameEnded) return;
    gameEnded = true;

    const ending = ENDINGS[endingId] || {
        title: "游戏结束",
        description: "本局已结束，可以刷新页面重新开始。"
    };

    const titleEl = document.getElementById("eventTitle");
    const descEl  = document.getElementById("eventDescription");
    const choicesEl = document.getElementById("choices");

    if (titleEl) titleEl.textContent = ending.title;

    if (descEl) {
        // 简单附带最终状态概览，方便调试和体验
        const summary =
          `\n\n【最终状态】\n` +
          `导师信任度：${(state.advisor ?? 0).toFixed(0)}\n` +
          `压力：${(state.stress ?? 0).toFixed(0)}\n` +
          `精力：${(state.energy ?? 0).toFixed(0)}\n` +
          `大论文：${(state.thesis ?? 0).toFixed(0)}\n` +
          `纵向项目：${(state.vertical ?? 0).toFixed(0)} / 横向项目：${(state.horizontal ?? 0).toFixed(0)}\n` +
          `考公线：${(state.civil ?? 0).toFixed(0)} / 大厂线：${(state.industry ?? 0).toFixed(0)}\n` +
          `研究所线：${(state.institute ?? 0).toFixed(0)} / 教职线：${(state.faculty ?? 0).toFixed(0)}\n` +
          `Ta好感度：${(state.TaAffection ?? 0).toFixed(0)}\n`;

        descEl.textContent = ending.description + summary;
        }

    if (choicesEl) choicesEl.innerHTML = "";

    logMessage("结局触发：" + ending.title);
    }

// ===================== 状态面板渲染 =====================

function renderStatus() {
    const s = state || {};

    // 恋爱标签文案与颜色
    let relationLabel;
    let relationChipClass;
    if (s.relationStatus === "broken") {
        relationLabel = "已分手";
        relationChipClass = "chip-broken";
        } else if (s.isDating) {
        relationLabel = "男/女朋友";
        relationChipClass = "chip-dating";
        } else {
        relationLabel = "暧昧对象";
        relationChipClass = "chip-ambiguous";
        }

    // 毕业去向状态变量：none / civil / industry / institute / faculty
    const jobStatus = s.jobStatus || "none";

    let careerEmoji = "😵";
    let careerStatusText = "未找到工作";
    switch (jobStatus) {
        case "civil":
            careerEmoji = "🏛️";
            careerStatusText = "已央选上岸";
            break;
        case "industry":
            careerEmoji = "💼";
            careerStatusText = "已签约大厂";
            break;
        case "institute":
            careerEmoji = "🎓";
            careerStatusText = "已签约研究生";
            break;
        case "faculty":
            careerEmoji = "🏫";
            careerStatusText = "已签约教职";
            break;
        default:
            careerEmoji = "😵";
            careerStatusText = "未找到工作";
            break;
            }

    // 主线总周数，用于“当前主线进度”
    const totalWeeks = Array.isArray(window.weekEvents) ? window.weekEvents.length : 0;

    const html = `
    <div class="dashboard">
      <div class="panel-row">
        <div class="panel">
          <div class="panel-title">状态概览</div>
          ${progressRow("精力", s.energy)}
          ${progressRow("压力", s.stress)}
        </div>

        <div class="panel">
          <div class="panel-title">人物关系</div>
          ${progressRow("导师信任度", s.advisor)}
          ${relationProgressRow(relationLabel, s.TaAffection, relationChipClass)}
        </div>
      </div>

      <div class="panel-row">
        <div class="panel">
          <div class="panel-title">科研与论文</div>
          ${progressRow("纵向项目", s.vertical)}
          ${progressRow("横向项目", s.horizontal)}
          ${progressRow("大论文", s.thesis)}
          <div class="panel-tags">
            <span class="tag">大论文为必修任务</span>
            <span class="tag tag-progress">当前主线进度：${currentWeekIndex}/${totalWeeks}</span>
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">毕业去向路线</div>
          ${progressRow("考公线", s.civil)}
          ${progressRow("大厂线", s.industry)}
          ${progressRow("研究所线", s.institute)}
          ${progressRow("教职线", s.faculty)}
          <div class="panel-tags">
            <span class="tag">${careerEmoji} ${careerStatusText}</span>
          </div>
        </div>
      </div>
    </div>
  `;

    document.getElementById("status").innerHTML = html;
    }


// 单行进度条
function progressRow(label, value) {
    const v = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
    return `
    <div class="stat-row">
      <span class="stat-label">${label}</span>
      <div class="progress-track">
        <div class="progress-fill" style="width:${v}%;"></div>
      </div>
      <span class="stat-value">${v.toFixed(0)}</span>
        </div>
      `;
      }

    // 人物关系进度条：左侧使用彩色 chip
function relationProgressRow(label, value, chipClass) {
    const v = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
    return `
    <div class="stat-row">
      <span class="stat-label">
        <span class="relation-chip ${chipClass}">${label}</span>
      </span>
      <div class="progress-track">
        <div class="progress-fill" style="width:${v}%;"></div>
      </div>
      <span class="stat-value">${v.toFixed(0)}</span>
        </div>
      `;
      }

// ===================== 杂项工具函数 =====================

function logMessage(msg) {
    const ul = document.getElementById("logList");
    if (!ul) return;
    const li = document.createElement("li");
    li.textContent = msg;
    ul.appendChild(li);

    const logDiv = document.getElementById("log");
    if (logDiv) logDiv.scrollTop = logDiv.scrollHeight;
    }

// 游戏结束时统一走结局判定
function endGame() {
if (gameEnded) return;
    const endingId = checkFinalEnding();
    showEnding(endingId);
}

// 0~1 之间的夹紧
function clamp01(x) {
    if (x < 0) return 0;
        if (x > 1) return 1;
        return x;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// 将字符串中的 HTML 特殊字符转义，避免 XSS
function escapeHtml(str) {
    return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
    }
