# 黄蕊实验材料核查

核查日期：2026-10-19。范围：原材料及方法可复用性；没有开发新实验，没有运行原始完整程序，没有收集参与者数据。下述改编是设计建议，不是已验证材料。

## 结论

尚未发现同时具备完整公开材料、AI代劳与辅助操纵、明确作品所有权、独立学习迁移测验的现成整套任务。

Alien Zoo 是目前材料最可取得的候选，可作为人工系统规则学习任务改编；若坚持现实技能迁移，则不宜将其列为首选。营养判断任务在独立学习测量上更贴近研究，但完整材料包尚未确认取得。电路故障排查不优先，避免重复高门槛问题。

## Alien Zoo：已检查实际文件

- 原仓库：https://github.com/ukuhl/IntroAlienZoo
- 本轮核对版本：689adf4b10fe8d670059d7cd1afd4ab5bc72c181。
- LICENSE：CC BY 4.0。复用应注明来源与修改；第三方组件或标识另行核查。
- 前端：FrontEnd/js/infoScene.js、startScene.js、stableScene.js、feedbackScene.js、questionnaireScene1.js 至 questionnaireScene5.js。
- 规则与模型：BackEnd/models.py；modelData 中有两项实验的生成脚本、数据与预训练模型文件。
- 日志与分析：handler 内有行为、反应时、问卷记录代码；UserData 和 StatisticalEvaluation 内有原数据及 R Markdown 分析。
- questionnaireScene1.js 的知识问题针对相关与无关植物的识别。没有在仓库文件树或已读方法中找到可直接用于黄蕊研究的独立远迁移题库。
- infoScene.js 中预计原流程约15—20分钟；不能据此预计加入黄蕊量表及测试后的总时长。
- 原依赖较旧，尚未运行；目前确认的是文件存在与部分实现内容，不是环境可直接使用。

原研究检验解释反馈的作用，不是 GenAI 使用模式，也没有检验 SoA → PO → perceived learning 的链式路径。

## 营养判断：学习证据更直接，材料尚未齐全

Gajos 与 Mamykina（2022）使用成对餐食判断，每个营养概念对应前测、干预、后测三题。实验分别检验提供答案与解释、先判断后看建议、仅提供解释等设计。各实验有共同基线，但不能将跨实验模式当作两个 AI 条件之间已完成的直接随机比较。

原文：https://arxiv.org/html/2202.05402

正式文献 DOI：https://doi.org/10.1145/3490099.3511138

正式版本的数据声明指向：https://doi.org/10.7910/DVN/JQL0JW

该数据入口本轮返回访问错误，未核查其中是否包含餐食图片、全部题目、解释与评分。因此只确认有数据声明，不声称已经获得完整实验材料。

该研究使用 simulated AI，不能当作实时 GenAI 的验证。后测主要支持概念在同类新题中的即时应用，不等同于现实饮食行为改变或远迁移。研究的主结论是相对于对应基线的学习差异，不是学习是否绝对为零。

## 若改编 Alien Zoo：最小改动草案

1. 保留一种原规则版本、原结果函数、植物特征范围及原轮次，不先压缩或改写成悬疑剧情。
2. 两组采用相同任务目标和界面。代劳组由系统提供完整喂养配方并提交；辅助组由参与者组合配方，系统提供规则相关提示。
3. 两组保留相同格式的最终配方，作为 ownership 的明确对象。该所有权对象及其操纵是新增部分，必须预测试。
4. 不将原 CFE 组与无解释组直接改名为辅助组与代劳组。
5. 添加无帮助的新配方判断与构造任务，并要求简短理由。先称独立规则应用测试；只有在题目结构及证据支持时才称迁移，不预称远迁移。
6. 两组尽量匹配反馈质量、呈现长度和任务机会；记录实际阅读、修改、时长与努力。若自适应选择造成后续信息不同，应将其作为整个使用模式干预的组成部分，并限制机制解释。
7. 准确描述帮助是固定规则、预生成 GenAI 内容或实时 GenAI。普通规则提示不能仅加一个 AI 标签就声称检验了 GenAI。

改编后保留：材料出处、明确人工规则、评分可检查性、原系统探索任务结构。

改编后不能直接继承：原组间效应、中文样本难度、独立测试效度、ownership 有效性及链式因果机制。

## 原始出处

Kuhl, U., Artelt, A., & Hammer, B. (2023). Let's go to the Alien Zoo: Introducing an experimental framework to study usability of counterfactual explanations for machine learning. Frontiers in Computer Science, 5, Article 1087929. https://doi.org/10.3389/fcomp.2023.1087929

Gajos, K. Z., & Mamykina, L. (2022). Do people engage cognitively with AI? Impact of AI assistance on incidental learning. In 27th International Conference on Intelligent User Interfaces (pp. 794–806). https://doi.org/10.1145/3490099.3511138

van Gog 等人电路研究全文及附录：https://research.ou.nl/ws/files/1023174/VanGog-etal_LI_2006.pdf
