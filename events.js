// events.js
// 主时间线事件 + 关键事件 + 暧昧随机事件 + 恋爱随机事件 + 导师随机事件 + 定时事件
// 本版：主线用 9–12 月份时间节点（T9-1 ~ T12-3）示意博士最后一年上学期 + 期末阶段。

// ===== 主时间线事件：9–12 月（按数组顺序依次推进） =====
window.weekEvents = [
  // ===== 9 月 =====
  {
      id: "T9-1",
      title: "9月上旬: 开学：方向选择",
      description: "导师把几个课题方向摆在你面前，你决定最后一年主攻哪一条？",
      choices: [
        {
            id: "T9-1-A",
            text: "坚持原来的纵向项目，稳扎稳打冲一篇完整大论文（科研主线）",
            effects: { vertical: 12, thesis: 10, advisor: 6, energy: -8, stress: 6 },
            feedback: "你向导师明确表示要专注原有纵向，导师点头同意，并提醒你既然选了就要把文章做出来。"
        },
        {
            id: "T9-1-B",
            text: "接手前师兄留下的“天坑项目”，冲高档次文章（高风险科研）",
            effects: { vertical: 15, thesis: 8, advisor: 8, energy: -10, stress: 10 },
            feedback: "导师对你的“敢接难题”很满意，同时特别强调时间紧、风险大，你的任务难度瞬间抬升。"
        },
        {
            id: "T9-1-C",
            text: "优先接下新横向项目，对接企业，走“项目+就业资源”路线（横向）",
            effects: { horizontal: 15, advisor: 8, thesis: -4, energy: -8, stress: 8, industry: 4 },
            feedback: "导师当场夸你肯扛事，把新横向项目直接交给你，并提到以后研究所/企业机会可以优先考虑你。"
        },
        {
            id: "T9-1-D",
            text: "坐等导师分配课题，自己多出去社交/找人处对象（摆烂）",
            effects: { advisor: -6, TaAffection: 6, energy: 4, stress: -4 },
            feedback: "你对导师说“您看怎么安排都行”，导师没多说什么，你的日程很快被约饭和聊天填满。"
        }
      ]
  },
  {
      id: "T9-2",
      title: "9月中旬: 就业动员会：四条去向路线",
      description: "学院集中介绍了考公、大厂、研究所和高校教职四种典型去向，你决定优先押哪一条？",
      choices: [
        {
            id: "T9-2-A",
            text: "主攻考公/选调，先把行测申论作为第一优先级（考公线）",
            effects: { civil: 15, industry: -5, institute: -5, faculty: -5, thesis: -3, stress: 8, energy: -6 },
            feedback: "你立刻下载历年真题、加入备考群，把刷题时间写进日程表，科研这边只够维持基本进度。"
        },
        {
            id: "T9-2-B",
            text: "主攻大厂/企业，把简历和笔面试准备放在第一位（大厂线）",
            effects: { industry: 15, civil: -5, institute: -5, faculty: -5, thesis: -3, stress: 8, energy: -6 },
            feedback: "你开始系统改简历、刷面经、看岗位，把“拿到offer”当成年度KPI。"
        },
        {
            id: "T9-2-C",
            text: "主攻研究所/科研单位，把导师推荐和科研成果放在第一位（研究所线）",
            effects: { institute: 15, thesis: 8, vertical: 6, civil: -4, industry: -4, stress: 6, energy: -5 },
            feedback: "你整理自己的论文和项目材料，和导师聊了聊潜在研究所去向，默认自己要在科研路上多走几步。"
        },
        {
            id: "T9-2-D",
            text: "主攻高校教职/博后，把教学与科研并重当远期目标（教职线）",
            effects: { faculty: 15, thesis: 10, vertical: 5, civil: -4, industry: -4, stress: 6, energy: -5 },
            feedback: "你开始关注高校招聘和博后流动站，给自己立下flag：今年的大论文和公开汇报都要像一个准老师。"
        }
      ]
  },
  {
      id: "T9-3",
      title: "9月下旬: 课题组阶段小结",
      description: "阶段汇报后，你被导师点名“执行力要再上来一点”，你打算怎么应对？",
      choices: [
        {
            id: "T9-3-A",
            text: "主动约导师单聊，重新规划一条“冲成果”的纵向+论文路线（纵向）",
            effects: { advisor: 8, vertical: 8, thesis: 8, energy: -5, stress: 5 },
            feedback: "你和导师重新圈定了几项优先实验，纵向和论文的发力方向更明确了。"
        },
        {
            id: "T9-3-B",
            text: "顺势接下更多横向任务，争取结题和导师推荐资源（横向）",
            effects: { advisor: 10, horizontal: 12, thesis: -4, energy: -7, stress: 8, industry: 4 },
            feedback: "你在组会上表示愿意多跑企业那边，导师记下你的名字，说以后推荐会优先考虑你。"
        },
        {
            id: "T9-3-C",
            text: "把注意力转向求职/考公，先把简历和考试节奏稳住（求职）",
            effects: { civil: 6, industry: 6, thesis: -3, vertical: -2, advisor: -4, stress: 6, energy: -6 },
            feedback: "你开始整理简历、看岗位、下载题库，导师察觉到你“心思没完全在科研上”，但也没明说。"
        },
        {
            id: "T9-3-D",
            text: "组会后拉上同门去聚餐吐槽一通，决定“先缓几周再说”（摆烂）",
            effects: { advisor: -4, stress: -4, energy: 4 },
            feedback: "火锅摊上吐槽声不断，你的心情好了一些，实验和论文则又往后拖了半小步。"
        }
      ]
  },

  // ===== 10 月 =====
  {
      id: "T10-1",
      title: "10月上旬: 国庆假期：去哪里消耗这7天",
      description: "国庆放假一周，导师、家里和Ta都有各自安排，你打算怎么用？",
      choices: [
        {
            id: "T10-1-A",
            text: "留校做实验和写论文，把国庆当加班周（科研）",
            effects: { thesis: 10, vertical: 8, advisor: 6, energy: -10, stress: 8 },
            feedback: "你把空荡荡的实验楼当成主场，数据和进度都往前推了一截。"
        },
        {
            id: "T10-1-B",
            text: "按家里安排回去走亲戚，顺便缓一缓（家庭）",
            effects: { energy: 10, stress: -6, civil: 4 },
            feedback: "你在各种饭局里不停回答“毕业打算”，虽然没干活，但脑子里多了一些“要不要回老家”的声音。"
        },
        {
            id: "T10-1-C",
            text: "和Ta或同学去周边城市短途旅行（恋爱/社交）",
            effects: { TaAffection: 8, energy: 8, stress: -8, thesis: -4 },
            feedback: "你在异地街头拍了很多照片，朋友圈收获一堆点赞，论文进度则停在原地。"
        },
        {
            id: "T10-1-D",
            text: "哪儿也不去，白天睡觉晚上刷手机和游戏（摆烂）",
            effects: { energy: 6, stress: -4 },
            feedback: "国庆过得像一个超长周末，你的休息值满格，待办列表也完整地留在原处。"
        }
      ]
  },
  {
      id: "T10-2",
      title: "10月中旬: 大厂实习机会：要不要冲一把",
      description: "一家大厂给了你实习/专项面试机会，时间和实验、横向略有冲突，你怎么选？",
      choices: [
        {
            id: "T10-2-A",
            text: "全力准备面试和实习，把大厂当第一目标（大厂）",
            effects: { industry: 15, horizontal: 6, thesis: -5, energy: -8, stress: 10 },
            feedback: "你开始刷题、改简历、看业务，实验只能挤时间做，大厂成了你时间表里最粗的一条线。"
        },
        {
            id: "T10-2-B",
            text: "有限投入，把机会当“试水”，科研仍是主线（折中）",
            effects: { industry: 8, thesis: -2, vertical: 4, energy: -5, stress: 6 },
            feedback: "你只准备了核心材料，接受“有就有、没就算”的结果，大厂成了练习题。"
        },
        {
            id: "T10-2-C",
            text: "婉拒实习，和导师说明自己更想专注论文和项目（科研）",
            effects: { industry: -5, thesis: 8, vertical: 6, advisor: 6, energy: -3, stress: 4 },
            feedback: "导师对你“专心科研”的态度颇为认可，顺口提到以后可以帮你多问几个研究所名额。"
        },
        {
            id: "T10-2-D",
            text: "只去蹭宣讲礼品和餐券，不认真准备，靠缘分看结果（摆烂）",
            effects: { industry: 3, energy: -3 },
            feedback: "你拿着礼品袋回实验室，面试感受一般，论文当然没什么进展。"
        }
      ]
  },
  {
      id: "T10-3",
      title: "10月下旬: 亲戚介绍“高大上”工作：保安队长事件",
      description: "亲戚说给你介绍一个“单位特别好、特别稳定”的岗位，结果发现是自家厂的“保安队长预备”，你怎么处理？",
      choices: [
        {
            id: "T10-3-A",
            text: "认真听完介绍，礼貌表达感谢，同时说明自己更想走科研/专业线",
            effects: { civil: 4, institute: 4, stress: 4, energy: -3 },
            feedback: "你耐心解释了自己的规划，亲戚虽然有点不理解，但至少没闹翻。"
        },
        {
            id: "T10-3-B",
            text: "先当作“备胎方案”，万一路走窄再说",
            effects: { stress: -3 },
            feedback: "你嘴上说“可以考虑”，心里给自己留了一条你也说不清是否真会走的退路。"
        },
        {
            id: "T10-3-C",
            text: "直接明确拒绝，表明不会考虑这类岗位",
            effects: { stress: 6, energy: -3, civil: -4, institute: 4, industry: 4 },
            feedback: "亲戚觉得你好像“读书读傻了”，你却第一次把想走的方向说得很清楚。"
        },
        {
            id: "T10-3-D",
            text: "当场尴尬笑笑，事后把经历当笑话讲给朋友/对象（摆烂）",
            effects: { TaAffection: 4, stress: -4, energy: 4 },
            feedback: "你在聊天时把“保安队长事件”讲得很精彩，大家笑作一团，“去哪”这个问题继续被搁置。"
        }
      ]
  },

  // ===== 11 月 =====
  {
      id: "T11-1",
      title: "11月上旬: Ta生病：谁的崩溃更优先",
      description: "Ta说自己身体/情绪撑不住了，而你正卡在实验、稿件和报名之间，你怎么回应？",
      choices: [
        {
            id: "T11-1-A",
            text: "直接推掉工作，去陪Ta看病/聊天（恋爱优先）",
            effects: { TaAffection: 12, energy: -8, stress: -6, thesis: -4, advisor: -3 },
            feedback: "你一整天都在陪Ta，晚上一回实验室看见没动的代码，只能对自己说“感情比进度重要一点”。"
        },
        {
            id: "T11-1-B",
            text: "视频/语音安慰Ta，答应接下来几天多聊，但不离开实验/自习室",
            effects: { TaAffection: 6, thesis: 4, vertical: 4, energy: -5, stress: -3 },
            feedback: "你在实验间隙回消息，Ta情绪稍稳，你的时间表则被拆得更加碎片化。"
        },
        {
            id: "T11-1-C",
            text: "简单回复“保重身体”，继续执行原计划（工作/科研优先）",
            effects: { thesis: 6, vertical: 4, civil: 4, industry: 4, stress: 4, TaAffection: -8 },
            feedback: "Ta很快就不再继续说话，你只能祈祷这不会成为之后感情线里的一个结点。"
        },
        {
            id: "T11-1-D",
            text: "装作没看到消息，等几天再说（摆烂）",
            effects: { TaAffection: -12, stress: 2 },
            feedback: "未读提醒一直挂着，你每次划过去都装作没注意到，心里却越来越不舒服。"
        }
      ]
  },
  {
      id: "T11-2",
      title: "11月中旬: 研究所面试：选哪一条科研路线",
      description: "几家研究所/科研单位都给了你面试机会，你更倾向哪一种？",
      choices: [
        {
            id: "T11-2-A",
            text: "本地国企研究所，方向接近现在课题，生活相对安稳",
            effects: { institute: 12, thesis: 6, vertical: 6, advisor: 4, energy: -4, stress: 5 },
            feedback: "你和导师讨论了这个所的课题和环境，感觉像是把现在的生活延伸到另一个实验楼。"
        },
        {
            id: "T11-2-B",
            text: "外地军工所，待遇好但出差多、强度大",
            effects: { institute: 15, stress: 10, energy: -8, TaAffection: -4 },
            feedback: "“国家项目”三个字很有吸引力，你也在脑海里快速模拟被项目和保密制度管死的日常。"
        },
        {
            id: "T11-2-C",
            text: "新一线城市的企业研究院，科研+产品节奏并行",
            effects: { institute: 8, industry: 8, horizontal: 6, stress: 6, energy: -6 },
            feedback: "这里既有论文也有发布会，听起来既刺激又不太安稳。"
        },
        {
            id: "T11-2-D",
            text: "全部都报着，面试到了再看心情准备（摆烂）",
            effects: { institute: 4, industry: 4, energy: -4, stress: 4 },
            feedback: "你的日历被“待定面试”占满，却没有哪一家被你当成真正首选。"
        }
      ]
  },
  {
      id: "T11-3",
      title: "11月下旬: 中央选调/国考报名：要不要上这条船",
      description: "中央选调和国考公告出来了，你还有最后的突击机会",
      choices: [
        {
            id: "T11-3-A",
            text: "认真挑岗位全力备考，把行测申论当成接下来重点之一（考公主线）",
            effects: { civil: 15, thesis: -5, vertical: -3, industry: -3, institute: -3, stress: 10, energy: -8 },
            // 随机版反馈：根据事件后的civil分数给一个上岸概率
            feedback: function (before, after) {
                // 只看“事件后的”civil（applyEffects之后传进来的after）
              const civilScore = Math.max(0, Math.min(100, after.civil || 0));

                // A选项：认真备考，基础概率高一些，civil越高越容易上岸
                let p = 0.15 + (civilScore / 100) * 0.6; // civil=0→约0.15，civil=100→约0.75
                if (p < 0.05) p = 0.05;
                if (p > 0.9) p = 0.9;

              const success = Math.random() < p;

                if (success) {
                    // 上岸成功：工作去向改为考公，考公线直接拉满
                    state.jobStatus = "civil";
                    state.civil = 100; // 考公线直接加到100
                    renderStatus();

                    return "你把岗位表拉到爆，精细挑完目标后一路刷题、背材料、模拟考试。出成绩那天，你看到自己稳稳进面并最终上岸，群里“恭喜上岸”的消息刷到手机发烫。";
                } else {
                    // 失败分支：沿用你原来的语气，补一句没上岸
                    return "你把岗位表拉到爆，选了几处目标，书桌上多了一摞新买的题集，但出成绩那天没能进面试名单，只能安慰自己“起码努力过”。";
                }
            }
        },
        {
            id: "T11-3-B",
            text: "随便找个还能报的岗位随机试试，复习“看缘分”（浅尝辄止）",
            effects: { civil: 6, thesis: -2, stress: 4, energy: -4 },
            // B选项：随缘占坑，基础概率和斜率都更低
            feedback: function (before, after) {
              const civilScore = Math.max(0, Math.min(100, after.civil || 0));

                // B选项：起点低+斜率低，真的是“随缘上岸”
                let p = 0.05 + (civilScore / 100) * 0.4; // civil=0→约0.05，civil=100→约0.45
                if (p < 0.02) p = 0.02;
                if (p > 0.8) p = 0.8;

              const success = Math.random() < p;

                if (success) {
                    state.jobStatus = "civil";
                    state.civil = 100; // 同样直接视为考公线满格

                    return "你本来只是“随便占个坑试试”，复习也是三天打鱼两天晒网，结果笔试和面试一路过关。公示名单里出现自己名字时，你有点恍惚：原来摸鱼报名也能上岸。";
                } else {
                    return "你在系统里随手点了一个岗位，安慰自己“起码试过”，至于能不能上岸完全靠运气——成绩出来果然和预期一样，没能上岸";
                }
            }
        },
        {
            id: "T11-3-C",
            text: "不报名，把时间和精力留给科研、研究所或大厂（放弃考公）",
            effects: { civil: -5, thesis: 6, vertical: 4, industry: 4, institute: 4, stress: -4 },
            feedback: "你关掉了所有公考交流群链接，周围人讨论“上岸”时你只当听新闻。"
        },
        {
            id: "T11-3-D",
            text: "连公告都懒得看，刷完吐槽视频后继续原样生活（摆烂）",
            effects: { stress: -5 },
            feedback: "你只记得网上的段子，却说不清今年的报名时间和条件。"
        }
      ]
  },

  // ===== 12 月 =====
  {
      id: "T12-1",
      title: "12月上旬: 学院征集“想去研究所的人”",
      description: "学院老师在群里说“想去研究所的可以来登记”，你怎么回应？",
      choices: [
        {
            id: "T12-1-A",
            text: "第一时间私聊老师登记，让导师知道你想走科研（科研志向）",
            effects: { institute: 12, thesis: 6, vertical: 6, advisor: 6, energy: -4, stress: 6 },
            feedback: "你把简历和论文列表整理好发过去，等于正式在档案里写下“科研向”。"
        },
        {
            id: "T12-1-B",
            text: "先去问学长学姐真实情况，再决定要不要报（信息收集）",
            effects: { institute: 4, energy: -4 },
            feedback: "你听到了各种各样的故事，对“去所里是什么生活”有了更具体画面。"
        },
        {
            id: "T12-1-C",
            text: "暂时不回应，继续把重心放在论文、横向和企业/考公上（观望）",
            effects: { thesis: 4, horizontal: 4, industry: 4, civil: 4 },
            feedback: "你看着那条群消息停留在聊天记录上，没有点开也没有删除，只是滑过去。"
        },
        {
            id: "T12-1-D",
            text: "把消息当八卦转给同学吐槽一番，自己啥也不报（摆烂）",
            effects: { stress: -3 },
            feedback: "你和同学一边笑着分析谁肯定会报，一边假装这件事和你完全无关。"
        }
      ]
  },
  {
      id: "T12-2",
      title: "12月中旬: 横向结题：要不要多干一点",
      description: "横向项目临近结题，企业和导师都在催，你怎么安排这段时间？",
      choices: [
        {
            id: "T12-2-A",
            text: "加班整理数据和报告，做到企业和导师都满意（横向主线）",
            effects: { horizontal: 15, advisor: 10, thesis: -4, energy: -8, stress: 10 },
            feedback: "你用几晚时间堆出厚厚一份报告，企业和导师在会上都点名夸了你。"
        },
        {
            id: "T12-2-B",
            text: "只做“刚刚够用”的版本，保证通过即可（保底）",
            effects: { horizontal: 8, advisor: 4, energy: -4, stress: 4 },
            feedback: "报告不算精彩但也说得过去，结题勉强过关，谁也不能挑太多毛病。"
        },
        {
            id: "T12-2-C",
            text: "在横向报告里尽量往论文和专利方向靠（科研+横向）",
            effects: { horizontal: 8, thesis: 6, institute: 4, energy: -6, stress: 6 },
            feedback: "你刻意把可发表部分写得更细，为之后论文和申请打下一些伏笔。"
        },
        {
            id: "T12-2-D",
            text: "能拖就拖，想着“反正还有时间”（摆烂）",
            effects: { horizontal: -4, advisor: -6, stress: 4 },
            feedback: "你一次次把“写报告”挪到待办清单的下一页，导师的语气开始变硬。"
        }
      ]
  },
  {
      id: "T12-3",
      title: "12月下旬: 圣诞节：社交与进度",
      description: "圣诞前后，同学和Ta都在约活动，你怎么安排？",
      choices: [
        {
            id: "T12-3-A",
            text: "和Ta单独约会，把这天留给Ta（恋爱）",
            effects: { TaAffection: 10, energy: 6, stress: -6, thesis: -4 },
            feedback: "你们在灯光和装饰下拍了几张合照，这一晚很轻松，论文则被你主动忽略。"
        },
        {
            id: "T12-3-B",
            text: "参加同学/课题组的圣诞聚会（社交）",
            effects: { energy: 6, stress: -4 },
            feedback: "你在聚会中听到各种去向八卦，顺便交流了一下大家的坑和进度。"
        },
        {
            id: "T12-3-C",
            text: "把这天当普通工作日，照常写论文或做实验（科研）",
            effects: { thesis: 8, vertical: 4, energy: -6, stress: 6, TaAffection: -4 },
            feedback: "窗外是圣诞歌，屏幕前是公式和图表，你决定今年先把毕业放在第一位。"
        },
        {
            id: "T12-3-D",
            text: "一个人在宿舍刷剧打游戏到半夜（摆烂）",
            effects: { energy: 4, stress: -4 },
            feedback: "剧集一集接一集，你把所有提醒和未读消息都丢到明天再看。"
        }
      ]
  },
    // ===== 1 月 =====
  {
      id: "T01-1",
      title: "1月上旬: 元旦假期安排",
      description: "元旦放假几天，你打算怎么利用这段时间？",
      choices: [
        {
            id: "T01-1-A",
            text: "留校继续写论文和做实验，当成加班窗口",
            effects: { thesis: 10, vertical: 4, advisor: 4, energy: -8, stress: 6 },
            feedback: "校园空了大半，你在实验室和电脑前多撑出了几页正文和几组数据。"
        },
        {
            id: "T01-1-B",
            text: "回家陪家人，顺便复习考公/春招",
            effects: { civil: 6, industry: 4, energy: 8, stress: -4, thesis: -3 },
            feedback: "亲戚们的问题有点多，但你总算稍微休整了一下，也翻了几套题目。"
        },
        {
            id: "T01-1-C",
            text: "和Ta/朋友跨年，放松一下再说",
            effects: { TaAffection: 8, energy: 6, stress: -6, thesis: -3 },
            feedback: "跨年夜的照片刷满了朋友圈，你心情轻了一些，论文页数则停在原地。"
        },
        {
            id: "T01-1-D",
            text: "一个人在宿舍刷剧打游戏，把假期当加强版周末",
            effects: { energy: 4, stress: -4 },
            feedback: "你睡到自然醒，剧情和排行一集接一集，待办事项安静地躺在列表里。"
        }
      ]
  },
  {
      id: "T01-2",
      title: "1月中旬: 寒假前：要不要推迟回家",
      description: "导师希望年前再收一波实验数据，家里也在催你早点回去，你怎么办？",
      choices: [
        {
            id: "T01-2-A",
            text: "直接表态愿意多留一周，把实验做完再回去",
            effects: { vertical: 10, advisor: 6, thesis: 4, energy: -8, stress: 8 },
            feedback: "导师很满意你的态度，你的行程表上多了一周紧凑的实验安排。"
        },
        {
            id: "T01-2-B",
            text: "和导师沟通，只比原计划多留几天",
            effects: { vertical: 6, advisor: 3, thesis: 2, energy: -4, stress: 4 },
            feedback: "你尽量在几天内把关键部分做完，既给了导师交代，也给自己留了回家的时间。"
        },
        {
            id: "T01-2-C",
            text: "坚持按原计划回家，实验留到年后",
            effects: { vertical: -4, advisor: -4, energy: 6, stress: -2, civil: 2 },
            feedback: "导师语气略有失望，但没有强行要求，你带着一点内疚踏上返程。"
        },
        {
            id: "T01-2-D",
            text: "消息先不回，机票也不订，拖到临近再说",
            effects: { advisor: -6, stress: 2 },
            feedback: "群里的提醒一条接一条，你既没有决定留也没有决定走，心里反而更乱。"
        }
      ]
  },
  {
      id: "T01-3",
      title: "1月下旬: 离校前最后一周",
      description: "宿舍已经空了一半，你还在纠结这最后几天要怎么用。",
      choices: [
        {
            id: "T01-3-A",
            text: "再安排一轮实验/修改，把寒假前的收尾做扎实",
            effects: { vertical: 6, thesis: 6, energy: -6, stress: 6 },
            feedback: "你把能跑的实验都压在这一周跑完，年后至少不会完全从零接上。"
        },
        {
            id: "T01-3-B",
            text: "专门整理资料，规划寒假科研和备考计划",
            effects: { thesis: 4, civil: 4, industry: 4, energy: -2, stress: 2 },
            feedback: "你把各条路线的todo写得满满一页，感觉稍微心里有底了一点。"
        },
        {
            id: "T01-3-C",
            text: "约Ta在校园里散步拍照，当作学期收尾",
            effects: { TaAffection: 8, energy: 4, stress: -4, thesis: -3 },
            feedback: "空荡的校园和冬天的光线构成了不错的背景，你们的聊天比课题轻松得多。"
        },
        {
            id: "T01-3-D",
            text: "提前收拾行李跑路，剩下的事“开学再说”",
            effects: { thesis: -3, advisor: -3, stress: -2, energy: 3 },
            feedback: "你把硬盘和笔记本随手一塞，告诉自己“年后好好干”，至于能不能做到先不想。"
        }
      ]
  },

  // ===== 2 月 =====
  {
      id: "T02-1",
      title: "2月上旬: 在家是科研还是学习",
      description: "回到家里，你要在论文、考试和完全放松之间做选择。",
      choices: [
        {
            id: "T02-1-A",
            text: "在家坚持查文献写论文，每天保证一定进度",
            effects: { thesis: 8, advisor: 2, energy: -4, stress: 4 },
            feedback: "客厅的电视声和你电脑上的参考文献互相打扰，但论文还是缓慢往前爬。"
        },
        {
            id: "T02-1-B",
            text: "把主要时间用在刷题和改简历上",
            effects: { civil: 8, industry: 6, thesis: -3, energy: -4, stress: 4 },
            feedback: "书桌上铺满了题本和面经，论文文件夹则安静地躺在角落。"
        },
        {
            id: "T02-1-C",
            text: "白天帮家里干活陪父母，晚上再看一点东西",
            effects: { energy: 6, stress: -4, thesis: 2 },
            feedback: "你在做家务和短暂的学习之间来回切换，心里多少觉得没有完全虚度。"
        },
        {
            id: "T02-1-D",
            text: "彻底放假，每天睡到中午再说",
            effects: { energy: 8, stress: -6, thesis: -4 },
            feedback: "起床时太阳已经很高，手机上的各种提醒全都被你划掉。"
        }
      ]
  },
  {
      id: "T02-2",
      title: "2月中旬: 春节选择",
      description: "春节期间，走亲戚、聚会和自我安排交织在一起。",
      choices: [
        {
            id: "T02-2-A",
            text: "认真应付亲戚问答，多打听回老家工作的可能",
            effects: { civil: 6, stress: 4, energy: -4 },
            feedback: "你被问了无数次“以后打算”，顺便也听到了一些当地岗位的消息。"
        },
        {
            id: "T02-2-B",
            text: "找借口躲开亲戚，在房间里写论文/刷题",
            effects: { thesis: 6, civil: 4, stress: 2, energy: -6 },
            feedback: "鞭炮声被门板隔在外面，你对着屏幕完成了几页内容。"
        },
        {
            id: "T02-2-C",
            text: "和Ta/朋友线上拜年聊天，分享彼此的近况",
            effects: { TaAffection: 8, stress: -4, energy: 2 },
            feedback: "视频那头的笑脸让你觉得，这个年过得没那么孤单。"
        },
        {
            id: "T02-2-D",
            text: "疯狂吃喝打牌通宵，完全不管进度",
            effects: { energy: -2, stress: -2, thesis: -2 },
            feedback: "你在麻将声和零食包装袋中度过了几个昼夜，脑子里一片轻飘飘。"
        }
      ]
  },
  {
      id: "T02-3",
      title: "2月下旬: 纵向结题冲刺",
      description: "纵向项目结题节点临近，你打算怎么处理这波任务？",
      choices: [
        {
            id: "T02-3-A",
            text: "抢在节点前把报告和关键实验做完",
            effects: { vertical: 15, thesis: 6, advisor: 6, energy: -8, stress: 8 },
            feedback: "你用几天时间把能补的都补上，纵向总算勉强能交差。"
        },
        {
            id: "T02-3-B",
            text: "只完成最低限度的部分，先保证能结题",
            effects: { vertical: 8, advisor: 2, energy: -4, stress: 4 },
            feedback: "报告不算精彩但也说得过去，至少不会在结题会上掉链子。"
        },
        {
            id: "T02-3-C",
            text: "更多精力放在论文和求职上，纵向只做一部分",
            effects: { thesis: 6, civil: 4, industry: 4, vertical: -3, advisor: -4, energy: -4, stress: 4 },
            feedback: "你对纵向的投入明显减少，换来的是简历和论文上的一点前进。"
        },
        {
            id: "T02-3-D",
            text: "继续拖延，告诉自己“开学再集中处理”",
            effects: { vertical: -4, advisor: -6, stress: 2 },
            feedback: "结题表格上的空格越来越多，你却始终没下定决心坐下来填。"
        }
      ]
  },

  // ===== 3 月 =====
  {
      id: "T03-1",
      title: "3月上旬: 春招开启",
      description: "大量公司开启春招/补录，你要不要跟一波？",
      choices: [
        {
            id: "T03-1-A",
            text: "疯狂投简历刷面经，把春招当主战场",
            effects: { industry: 15, energy: -8, stress: 8, thesis: -4 },
            feedback: "你的邮箱被HR邮件塞满，论文文件则被你一再往后拖。"
        },
        {
            id: "T03-1-B",
            text: "只投几家心仪公司，其余时间继续写论文",
            effects: { industry: 8, thesis: 6, energy: -5, stress: 5 },
            feedback: "你维持了基本的投递节奏，同时也没完全放掉大论文。"
        },
        {
            id: "T03-1-C",
            text: "仍然把重点放在考公/研究所，春招只是备选",
            effects: { civil: 6, institute: 6, thesis: 4, industry: -3, energy: -4, stress: 4 },
            feedback: "你只象征性地投了几份，真正费心思的是公考和科研单位资料。"
        },
        {
            id: "T03-1-D",
            text: "看着招聘信息发呆，什么也没投",
            effects: { stress: 1, energy: 1 },
            feedback: "招聘网站一刷再刷，你始终没有点下“投递”按钮。"
        }
      ]
  },
  {
      id: "T03-2",
      title: "3月中旬: 预答辩准备",
      description: "学院安排了预答辩，你需要在老师面前展示当前论文进展。",
      choices: [
        {
            id: "T03-2-A",
            text: "提前多次彩排，准备完整PPT和讲稿",
            effects: { thesis: 12, advisor: 8, energy: -8, stress: 8 },
            feedback: "你的预答辩表现比较稳，老师的意见集中在细节和表达上。"
        },
        {
            id: "T03-2-B",
            text: "准备七成内容，剩下现场随机应变",
            effects: { thesis: 8, advisor: 3, energy: -5, stress: 6 },
            feedback: "整体流程还算顺畅，只是在几个问题上被追问得有些紧张。"
        },
        {
            id: "T03-2-C",
            text: "认为预答辩只是形式，按最低标准准备",
            effects: { thesis: 4, advisor: -3, energy: -3, stress: 4 },
            feedback: "导师在点评时提醒你正式答辩不能这样，你感受到了一点不耐烦。"
        },
        {
            id: "T03-2-D",
            text: "找理由推迟或缺席预答辩",
            effects: { thesis: -4, advisor: -8, stress: 2 },
            feedback: "你逃过了这一轮讨论，但换来的是导师明显不满。"
        }
      ]
  },
  {
      id: "T03-3",
      title: "3月下旬: 论文送审节点",
      description: "预答辩之后，导师问你何时能把论文定稿送审。",
      choices: [
        {
            id: "T03-3-A",
            text: "咬牙这几周把论文定稿，按时送审",
            effects: { thesis: 15, advisor: 8, energy: -10, stress: 10 },
            feedback: "你把日程全部让位给论文，终于在最后期限前把稿件交了上去。"
        },
        {
            id: "T03-3-B",
            text: "和导师商量略微推迟，换取多一点修改时间",
            effects: { thesis: 10, advisor: 2, energy: -6, stress: 6 },
            feedback: "导师提醒你再拖就会顶到后面流程，你答应这是最后一次延期。"
        },
        {
            id: "T03-3-C",
            text: "部分章节写得比较粗糙，先送出去再说",
            effects: { thesis: 8, advisor: -2, energy: -6, stress: 8 },
            feedback: "你心里清楚还有很多可以改进的地方，只能期待评阅意见不要太狠。"
        },
        {
            id: "T03-3-D",
            text: "再一次拖延，让论文继续停在“临近完成”的状态",
            effects: { thesis: -4, advisor: -8, stress: 4 },
            feedback: "“最后再改一改”成了你的口头禅，送审时间越来越往后挪。"
        }
      ]
  },

  // ===== 4 月 =====
  {
      id: "T04-1",
      title: "4月上旬: 送审间隙要不要短途旅行",
      description: "论文送审后出现了一小段空档，同学提议周边短途旅行。",
      choices: [
        {
            id: "T04-1-A",
            text: "跟同学/对象一起出去散心几天",
            effects: { TaAffection: 8, energy: 6, stress: -8, thesis: -3 },
            feedback: "路上的风景很好，你暂时把“评阅意见”和“答辩”抛在了脑后。"
        },
        {
            id: "T04-1-B",
            text: "只去一天，剩下时间继续整理资料",
            effects: { horizontal: 4, thesis: 4, energy: -2, stress: -2 },
            feedback: "你适度放松又没完全躺平，回来后还能接上手头的工作。"
        },
        {
            id: "T04-1-C",
            text: "完全不去，继续留在学校做后续准备",
            effects: { thesis: 6, vertical: 4, energy: -4, stress: 4, TaAffection: -3 },
            feedback: "你对着空空的实验室和草稿纸安慰自己：以后还有机会出去玩。"
        },
        {
            id: "T04-1-D",
            text: "嘴上说想去，结果也没报团也没干活，几天就这么过去",
            effects: { stress: -1, energy: 1 },
            feedback: "旅行没成行，论文也没动多少，你有点说不清这几天是怎么过的。"
        }
      ]
  },
  {
      id: "T04-2",
      title: "4月中旬: 再一次旅行诱惑",
      description: "同学又提议一次更远的长途旅行，时间已经接近盲审结果出来。",
      choices: [
        {
            id: "T04-2-A",
            text: "请假去长途，先玩一圈再说",
            effects: { energy: 8, stress: -6, thesis: -4, advisor: -4 },
            feedback: "朋友圈里的风景非常好看，导师的未读消息看起来没那么好看。"
        },
        {
            id: "T04-2-B",
            text: "把行程压缩成周末两天，尽量兼顾",
            effects: { energy: 4, stress: -3, thesis: -2 },
            feedback: "你在短暂的旅途中匆忙充电，回程时又恢复到熟悉的节奏里。"
        },
        {
            id: "T04-2-C",
            text: "礼貌拒绝，留在学校等结果并准备修改",
            effects: { thesis: 4, advisor: 2, energy: -3, stress: 3 },
            feedback: "你把时间用在整理材料和回顾论文，默默为可能到来的修改做准备。"
        },
        {
            id: "T04-2-D",
            text: "既没报名也没认真工作，继续在宿舍晃悠",
            effects: { energy: 2, stress: -2, thesis: -1 },
            feedback: "你刷着别人的旅行照片消磨时间，说服自己“现在也确实挺累的”。"
        }
      ]
  },
  {
      id: "T04-3",
      title: "4月下旬: 送审结果到来",
      description: "盲审结果返回，有的给“小修”，有的要求“重大修改”。",
      choices: [
        {
            id: "T04-3-A",
            text: "立刻和导师对着意见逐条分解任务",
            effects: { thesis: 8, advisor: 6, stress: 6, energy: -6 },
            feedback: "你和导师把意见分成几类，修改思路逐渐清晰，但压力也真实落到了桌面上。"
        },
        {
            id: "T04-3-B",
            text: "先自己默默看几遍，过几天再约导师讨论",
            effects: { thesis: 6, stress: 4, energy: -3 },
            feedback: "你在电脑前来回滚动评阅意见，知道这几页文字会决定接下来一个月的生活。"
        },
        {
            id: "T04-3-C",
            text: "一看到“修改意见太多”就心态崩坏，好几天不想碰文档",
            effects: { stress: 10, energy: -4, thesis: -4 },
            feedback: "你把文档关上，假装这封邮件从来没来过，焦虑却一点没少。"
        },
        {
            id: "T04-3-D",
            text: "把邮件标记为未读，继续逃避到其他琐事里",
            effects: { stress: 6, thesis: -6, advisor: -4 },
            feedback: "收件箱的红点一直挂着，你知道自己迟早得点下去。"
        }
      ]
  },

  // ===== 5 月 =====
  {
      id: "T05-1",
      title: "5月上旬: 根据意见修改论文",
      description: "你开始按照评阅意见修改论文，还有一些补实验和重画图的工作。",
      choices: [
        {
            id: "T05-1-A",
            text: "扎实地逐条修改，能补的实验就补上",
            effects: { thesis: 15, advisor: 6, vertical: 6, energy: -10, stress: 10 },
            feedback: "你在数据和图表之间来回穿梭，论文逐渐变得更像一篇成型的作品。"
        },
        {
            id: "T05-1-B",
            text: "先改外观和格式，技术内容慢慢补",
            effects: { thesis: 8, stress: 4, energy: -6 },
            feedback: "版面好看了很多，实质性修改还需要再挤时间完成。"
        },
        {
            id: "T05-1-C",
            text: "只处理最明显的问题，希望答辩时能糊过去",
            effects: { thesis: 6, advisor: -2, stress: 6, energy: -4 },
            feedback: "你选择性地改了一部分，对剩下的意见则寄希望于答辩现场。"
        },
        {
            id: "T05-1-D",
            text: "打开文档又关掉，告诉自己“明天再改也来得及”",
            effects: { thesis: -4, stress: 4 },
            feedback: "进度条停在原地，你的内心则多了一层隐隐的不安。"
        }
      ]
  },
  {
      id: "T05-2",
      title: "5月中旬: 正式答辩",
      description: "答辩日终于到来，你需要在评委面前完整讲述自己的工作。",
      choices: [
        {
            id: "T05-2-A",
            text: "提前多次试讲和模拟答辩，尽量把环节走顺",
            effects: { thesis: 10, advisor: 6, stress: 10, energy: -8 },
            feedback: "你的陈述比较流畅，答辩老师的问题也在准备范围之内。"
        },
        {
            id: "T05-2-B",
            text: "只准备PPT和常见问题，现场随机应变",
            effects: { thesis: 6, stress: 6, energy: -6 },
            feedback: "整体还算过得去，只是在个别细节问题上被问得有些心虚。"
        },
        {
            id: "T05-2-C",
            text: "指望导师帮你兜底，自己准备一般",
            effects: { thesis: 4, advisor: -2, stress: 4 },
            feedback: "导师在关键处帮你补充了一些内容，你心里既感激又有些惭愧。"
        },
        {
            id: "T05-2-D",
            text: "前一晚临时抱佛脚，几乎没睡",
            effects: { thesis: 2, stress: 8, energy: -8 },
            feedback: "你顶着黑眼圈上阵，虽然勉强讲完，但很多地方都显得有些慌乱。"
        }
      ]
  },
  {
      id: "T05-3",
      title: "5月下旬: 和Ta拍毕业照",
      description: "大家开始预约毕业照，Ta问你要不要一起拍一组单独的。",
      choices: [
        {
            id: "T05-3-A",
            text: "认真打扮，和Ta拍一整套，并顺便聊聊未来安排",
            effects: { TaAffection: 12, stress: -4, energy: -2 },
            feedback: "镜头里你们看起来很般配，关于未来的讨论也变得更具体了一点。"
        },
        {
            id: "T05-3-B",
            text: "只参加大合照，小合照说“以后再说”",
            effects: { TaAffection: -4, stress: 2 },
            feedback: "Ta笑着说没关系，但你感觉到氛围里有一点点落差。"
        },
        {
            id: "T05-3-C",
            text: "约上几个好朋友和Ta一起拍，让气氛轻松一点",
            effects: { TaAffection: 6, stress: -2, energy: -2 },
            feedback: "大家一起笑着摆姿势，这一天被定格在了一堆略微尴尬却真实的照片里。"
        },
        {
            id: "T05-3-D",
            text: "以“太忙/太累”为由拒绝任何合照",
            effects: { TaAffection: -8, stress: 2, energy: 2 },
            feedback: "别人晒照时你只在下面点个赞，自己的身影却很难出现在镜头里。"
        }
      ]
  },

  // ===== 6 月 =====
  {
      id: "T06-1",
      title: "6月上旬: 抽查与材料核对",
      description: "学院/研工部开始抽查原始数据、实验记录和论文格式。",
      choices: [
        {
            id: "T06-1-A",
            text: "早就整理好材料，从容应对检查",
            effects: { advisor: 6, stress: -4, energy: -2 },
            feedback: "检查过程相当顺利，你顺便帮同门看了一下他们的材料。"
        },
        {
            id: "T06-1-B",
            text: "临时抱佛脚到处找原始记录",
            effects: { stress: 6, energy: -6 },
            feedback: "你翻箱倒柜找硬盘和实验本，总算勉强拼出一套完整记录。"
        },
        {
            id: "T06-1-C",
            text: "有些数据找不到，只能勉强糊弄过去",
            effects: { advisor: -4, stress: 8, energy: -4 },
            feedback: "你表面镇定，心里却知道这套记录经不起太细的追问。"
        },
        {
            id: "T06-1-D",
            text: "抱着“应该轮不到我”的想法，什么都没准备",
            effects: { advisor: -6, stress: 4 },
            feedback: "每次听到“抽查”两个字你都紧张一下，但仍然没有真正动手整理。"
        }
      ]
  },
  {
      id: "T06-2",
      title: "6月中旬: 毕业聚会安排",
      description: "同学们一波波组织聚餐告别，你要怎么参与？",
      choices: [
        {
            id: "T06-2-A",
            text: "积极参加各种聚会，好好和大家告别",
            effects: { energy: -4, stress: -4 },
            feedback: "你在不同的餐桌之间奔波，听完了许多人的去向和故事。"
        },
        {
            id: "T06-2-B",
            text: "只挑自己关系最好的几场参加",
            effects: { energy: -2, stress: -3, TaAffection: 2 },
            feedback: "你把有限的精力留给最熟悉的几个人，这些夜晚显得格外真诚。"
        },
        {
            id: "T06-2-C",
            text: "借机多问问别人单位和岗位情况",
            effects: { industry: 4, civil: 4, institute: 4, stress: -2, energy: -2 },
            feedback: "你一边聊天一边做笔记，对不同去向的实际情况有了更直观的印象。"
        },
        {
            id: "T06-2-D",
            text: "尽量不出门，在宿舍刷朋友圈看别人聚会照片",
            effects: { stress: -2, energy: 2 },
            feedback: "你隔着屏幕看大家拥抱合照，心里有一点轻松也有一点空落。"
        }
      ]
  },
  {
      id: "T06-3",
      title: "6月下旬: 离校收尾",
      description: "还学位服、清宿舍、办离校手续，一切都在走向结束。",
      choices: [
        {
            id: "T06-3-A",
            text: "亲自把所有流程跑一遍，确认材料无误",
            effects: { stress: -2, energy: -4 },
            feedback: "你看着纸质材料上密密麻麻的章，确认这段学生生涯已经顺利画上句号。"
        },
        {
            id: "T06-3-B",
            text: "和同门互相帮忙分工跑流程",
            effects: { stress: -3, energy: -3, advisor: 2 },
            feedback: "你们互相代办手续，效率高了不少，顺便又回顾了一遍这几年的坑和收获。"
        },
        {
            id: "T06-3-C",
            text: "只做最低限度，遇到问题再说",
            effects: { stress: -1, energy: -1 },
            feedback: "你感觉流程并不复杂，于是按最简单的方式走完，心想有问题再补。"
        },
        {
            id: "T06-3-D",
            text: "东西随便一塞，手续也懒得细看，想着反正总能解决",
            effects: { stress: -2, advisor: -2 },
            feedback: "你匆匆把钥匙和学位服交回去，很多细节都留给了“以后再说”。"
        }
      ]
  }


];

// ===== 关键事件：告白（M-key） / 分手（S-key-1） =====
window.keyEvents = {
    mKey: {
        id: "mKey",
        title: "M-key：黄昏散步的告白",
        description:
          "某天黄昏，你和Ta在校园边走边聊。聊到未来去向的时候，Ta突然停下脚步：\n“你觉得，我们现在算是什么关系？要不要试试看正式在一起？”",
        choices: [
          {
              id: "mKey_accept",
              text: "正式答应在一起",
              effects: { setIsDating: true, clampTaMin: 65 },
              feedback: "你鼓起勇气点头答应，空气安静了一瞬，随后的笑容让你觉得这一切值得。"
          },
          {
              id: "mKey_refuse",
              text: "委婉拒绝：现在压力太大，还是先别谈恋爱",
              effects: { setTaAffection: 50 },
              feedback: "Ta沉默了几秒，点了点头，说还是先把毕业搞定比较重要。气氛有一点点尴尬。"
          },
          {
              id: "mKey_delay",
              text: "含糊其辞：先这样吧，以后再说",
              effects: { setTaAffection: 55 },
              feedback: "你没有给出正面回答，关系维持在暧昧的平衡上，但你隐约感觉到Ta有些不安。"
          }
        ]
    },
    sKey1: {
        id: "sKey1",
        title: "S-key-1：冷战后的分手摊牌",
        description:
          "最近你们的相处充满了冷战和误会。某个晚上，Ta约你出来，在校园一角停下：\n“这样下去我们都很累，要不要就到这里？”",
        choices: [
          {
              id: "sKey1_break",
              text: "接受分手：承认自己顾不过来",
              effects: { setIsDating: false, setTaAffection: 0, stress: 10 },
              feedback: "你没有再辩解，只是承认了自己的无力，这段关系停在了校园的路灯下。"
          },
          {
              id: "sKey1_save",
              text: "竭力挽回：保证会调整时间，把Ta放在更高优先级",
              effects: { clampTaMin: 65, stress: 3, energy: -3 },
              feedback: "你把所有的歉意和承诺都说出口，Ta虽然没有马上露出笑容，但也没有再提分手。"
          },
          {
              id: "sKey1_letgo",
              text: "把选择权交给Ta：“如果你觉得结束更好，我尊重你”",
              effects: { setIsDating: false, setTaAffection: 0, stress: 6 },
              feedback: "你把决定权交还给Ta，最后的答案是“分开一段时间吧”，你们在沉默中告别。"
          }
        ]
    }
};

// ===== 暧昧随机事件池（仅 relationStatus === "single" 时触发） =====
window.ambiguousEvents = [
  {
      id: "m-1",
      title: "M-1：实验室楼下偶遇",
      description:
        "做实验做到半夜，你走出实验室透透气，在楼下遇到了也刚下机回宿舍的Ta。\nTa看起来有点困：“你也还没回去啊？”",
      choices: [
        {
            id: "m1_c1",
            text: "顺路一起走回宿舍，随便聊聊最近进展",
            effects: { TaAffection: 8, energy: 3, stress: -3 },
            feedback: "你们一路从实验聊到人生，夜色中暧昧的距离似乎又拉近了一点。"
        },
        {
            id: "m1_c2",
            text: "客套两句之后赶紧回实验室继续干活",
            effects: { thesis: 4, energy: -4, TaAffection: -3 },
            feedback: "Ta愣了一下，说了句“那你加油”，你感觉自己有点太忙，也有点太冷。"
        },
        {
            id: "m1_c3",
            text: "提议去楼下便利店买杯热饮再回去",
            effects: { TaAffection: 10, energy: 5, stress: -5 },
            feedback: "便利店的灯光很暖，你们一边喝着热饮，一边吐槽组会和实验，气氛放松很多。"
        }
      ]
  },
  {
      id: "m-2",
      title: "M-2：朋友圈点赞",
      description:
        "Ta发了一条朋友圈，配图是教室窗边的夕阳和一摞备考资料。你刷到的时候已经过去了半天。",
      choices: [
        {
            id: "m2_c1",
            text: "点个赞再默默关掉，没有再说话",
            effects: { TaAffection: 2 },
            feedback: "Ta没有特别的反应，这条互动安静地淹没在一长串红点之中。"
        },
        {
            id: "m2_c2",
            text: "点开评论区认真回了一大段鼓励的话",
            effects: { TaAffection: 7, energy: -2, stress: -1 },
            feedback: "Ta很快回了一串表情，评论区看起来像是你们的小对话框。"
        },
        {
            id: "m2_c3",
            text: "直接私聊：“最近复习怎么样？要不要一起自习？”",
            effects: { TaAffection: 9, energy: -1 },
            feedback: "Ta犹豫了一下还是答应了，你们约好了周末一起去图书馆。"
        }
      ]
  },
  {
      id: "m-3",
      title: "M-3：临时组队自习",
      description:
        "图书馆自习室临时通知要清场调整座位，管理员说可以两个人一组拼桌。Ta刚好也在这个自习室。",
      choices: [
        {
            id: "m3_c1",
            text: "主动邀请Ta和你拼桌，一起自习",
            effects: { TaAffection: 10, thesis: 5, stress: -2, energy: -3 },
            feedback: "你们并排而坐，一边学习一边偶尔交换几句吐槽，时间过得没那么煎熬了。"
        },
        {
            id: "m3_c2",
            text: "假装没看到，对着手机装忙，自己换个角落坐",
            effects: { TaAffection: -5, stress: 1 },
            feedback: "你装作很忙的样子，其实心里有点在意Ta有没有注意到你的“躲闪”。"
        },
        {
            id: "m3_c3",
            text: "先观察Ta有没有和别人拼桌，如果没有再晚一点过去搭话",
            effects: { TaAffection: 5, stress: 1, energy: -1 },
            feedback: "你等了一会儿才走过去，Ta没有拒绝，氛围略显拘谨但并不尴尬。"
        }
      ]
  }
];

// ===== 恋爱随机事件池（仅 relationStatus === "dating" 时触发） =====
window.romanticEvents = [
  {
      id: "s-1",
      title: "S-1：晚自习后的夜宵",
      description:
        "一天忙到很晚，你刚从自习室出来，Ta发消息：“要不要顺路吃个夜宵？我请你。”",
      choices: [
        {
            id: "s1_c1",
            text: "答应，一起去学校门口小吃摊坐一会",
            effects: { TaAffection: 10, stress: -5, energy: -3 },
            feedback: "你们坐在路边小摊吃烤串，聊起对未来各自的打算，这一刻好像暂时忘了论文和考试。"
        },
        {
            id: "s1_c2",
            text: "拒绝：实验没做完，论文还没赶出来",
            effects: { thesis: 6, TaAffection: -6, stress: 3 },
            feedback: "Ta发了个“好吧”的表情，话题就停住了，你心里清楚这次拒绝会留下痕迹。"
        },
        {
            id: "s1_c3",
            text: "提议打包带回实验室，两个人对着电脑吃",
            effects: { TaAffection: 7, thesis: 4, stress: -2, energy: -4 },
            feedback: "实验室一角成了你们的临时夜宵摊，虽然环境简陋，但两个人都有点开心。"
        }
      ]
  },
  {
      id: "s-2",
      title: "S-2：刷题还是视频通话",
      description:
        "考公题刷到头昏眼花，Ta发来视频通话请求：“休息十分钟，跟我聊聊？”",
      choices: [
        {
            id: "s2_c1",
            text: "接起视频，两个人一起吐槽最近生活",
            effects: { TaAffection: 9, stress: -4, energy: 2 },
            feedback: "你们互相抱怨工作量和考试难度，笑着笑着，心里的压力轻了一些。"
        },
        {
            id: "s2_c2",
            text: "挂断并发消息：先别打扰，我要集中复习",
            effects: { civil: 8, TaAffection: -5, stress: 4 },
            feedback: "Ta发来一个“加油”的表情，但后面的聊天明显变少了，你也有一点点不安。"
        },
        {
            id: "s2_c3",
            text: "接起视频，但一边聊一边继续刷题",
            effects: { TaAffection: 5, civil: 4, stress: -1, energy: -2 },
            feedback: "摄像头那头的Ta盯着屏幕里的你，你们时不时交换两句吐槽，效率一般但心情不错。"
        }
      ]
  }
];

// ===== 导师随机事件池（基于导师信任度概率触发） =====
window.advisorEvents = [
  {
      id: "d-1",
      title: "D-1：临时加塞的组会汇报",
      description:
        "导师在群里at你：“这周组会你顺便把纵向的阶段进展讲一下吧，就十分钟。”\n你本来打算这几天主攻大论文。",
      choices: [
        {
            id: "d1_c1",
            text: "赶紧整理PPT，把最近数据凑成一版能讲的东西",
            effects: { advisor: 8, vertical: 8, stress: 5, energy: -6 },
            feedback: "你熬夜把PPT赶出来，导师在组会上点了点头，其他同门的眼神里也多了点认可。"
        },
        {
            id: "d1_c2",
            text: "如实说明进展不多，希望延期到下周",
            effects: { advisor: -3, stress: -2, thesis: 4 },
            feedback: "导师沉默了一会，说“那下周记得好好准备”，你心里压力稍降但也有点发虚。"
        },
        {
            id: "d1_c3",
            text: "硬着头皮上，用之前的老图和一点新结果拼一拼",
            effects: { advisor: 2, vertical: 4, stress: 4, energy: -3 },
            feedback: "汇报过程还算平稳，只是被追问了几句细节，你暗暗提醒自己下次准备得更充分一点。"
        }
      ]
  },
  {
      id: "d-2",
      title: "D-2：导师临时安排横向测试",
      description:
        "导师突然敲你办公室门：“周末那家企业那边有个测试，看看你能不能去一趟？”",
      choices: [
        {
            id: "d2_c1",
            text: "爽快答应，把周末整块时间腾出来",
            effects: { advisor: 10, horizontal: 12, energy: -8, stress: 4 },
            feedback: "企业那边对你的专业度评价不错，导师也在群里专门点名表扬了一句。"
        },
        {
            id: "d2_c2",
            text: "婉拒：周末已经排满了考公/面试安排",
            effects: { advisor: -4, civil: 6, stress: 3 },
            feedback: "导师表情略有不悦，但也没有强行安排，你知道自己把赌注押在了另一条路上。"
        },
        {
            id: "d2_c3",
            text: "提议和师弟/师妹一起去，分担一部分工作",
            effects: { advisor: 6, horizontal: 8, energy: -5, stress: 2 },
            feedback: "导师同意了这个折中方案，你既露了面又不至于把整个周末都填满。"
        }
      ]
  }
];

// ===== 定时事件：示例——在 T10-2（大厂实习机会）之后触发企业宣讲会 =====
window.timedEvents = {
    afterWeek: {
        "T10-2": [
          {
              id: "timed_company_talk",
              title: "企业宣讲会",
              description:
                "学院就业办公室发来通知：某大厂本周来学院做技术+招聘宣讲会，你可以选择怎么参与。",
              choices: [
                {
                    id: "timed_c1",
                    text: "去现场听宣讲，顺便加几个HR/技术微信",
                    effects: { industry: 10, energy: -5, stress: 2 },
                    feedback: "你记录了几条感兴趣的岗位，也大致摸清了大厂的筛选流程。"
                },
                {
                    id: "timed_c2",
                    text: "在线上看回放，边写论文边听",
                    effects: { industry: 6, thesis: 4, energy: -3 },
                    feedback: "你一边写论文一边听宣讲，信息掌握得没那么细，但也算知道了大致方向。"
                },
                {
                    id: "timed_c3",
                    text: "完全不去，把时间留给纵向/横向任务",
                    effects: { vertical: 4, horizontal: 4, industry: -3 },
                    feedback: "你对大厂暂时没太大兴趣，专心把手头的项目再往前推了一点。"
                }
              ]
          }
        ]
    }
};
