# 替代任务第二轮筛查

日期：2026-10-19。Road Trip 暂停：核心策略过于简短，AI 作用与 Psychological Ownership 适用性不足。此次只筛查，不制作新的正式实验材料。

## 筛查标准

任务需包含可被 AI 接管、也可被 AI 辅助的实质认知步骤；有可学习内容与无辅助新题；成人可理解；能客观评分；可追溯原材料。公开论文、公开数据、完整题库、可运行实验必须分别判断。

## A. 营养判断与偶发学习：机制证据优先候选

Gajos, K. Z., & Mamykina, L. (2022). Do people engage cognitively with AI? Impact of AI assistance on incidental learning. In *Proceedings of the 27th International Conference on Intelligent User Interfaces* (pp. 794–806). https://doi.org/10.1145/3490099.3511138

作者全文：https://www.eecs.harvard.edu/~kgajos/papers/2022/gajos2022people.pdf

任务比较两份餐食中指定营养成分的含量。同一概念安排不同的前测、干预、后测题。系列实验区分推荐加解释、先自行选择后修改、仅给解释。后者观察到相对于简单反馈基线的学习收益。不同 AI 设计分属不同实验，不能直接称为两种 AI 使用模式的随机头对头比较。

原 AI 是始终正确的 simulated AI，不是实时 Generative AI。论文中有任务与界面示例；本轮未确认完整原图、题库、解释文本及程序的公开下载包。

在线 nutrition.labinthewild.org 当前显示预测 AI 决策的另一种任务，不能把该网址当作 2022 论文原实验。

研究判断：适合借鉴「结论是否由 AI 直接提供」的操纵，但选择题产物拥有感可能弱。改为中国餐食会改变食材、营养比较与题目难度，需重做答案审查、平行题检验与预测试。原本的 Nutrition Knowledge 也不能直接更名为 Perceived Learning。

## B. 约束逻辑排序：低领域知识候选

Wu 等（2026），*The impact of AI usage and informativeness on skill development in logical reasoning*。本轮核查的可访问稿：https://arxiv.org/html/2605.21695 。作者标注 HHAI 2026；引用正式出版信息前再核对出版版本。

任务根据多条约束排列六个对象；设计有无 AI 前测、AI 可用阶段、无 AI 后测。帮助是揭示一个或三个对象的位置，属于信息量操纵与模拟 AI，并非「代劳 vs 辅助」。跨题还含与位置关联的视觉标记，学习可能混合推理练习与规律提取。

已确认方法和界面示例；本轮没有定位完整原题库、生成器及运行程序。不能把自行生成的排列题称作已验证原材料。原研究还涉及自主求助，按实际重度/轻度使用分组的分析不能直接支持 AI 使用量的因果效应。

相关后续稿：Wu 等（2026），*How AI assistance affects human skill development: A study of learning with logic puzzles*，https://arxiv.org/html/2608.23543 。本轮核查的是 arXiv 版本。它改变求助成本，不能视作与上一研究完全相同的操纵。

研究判断：比领域知识题更便于控制内容，但不是消除一般推理能力、工作记忆或谜题经验差异。给完整解答与给分步推理提示的对比是待开发的新操纵。需要先明确测学习的是逻辑规则、题型熟练度还是隐藏线索，不能笼统称为一般 reasoning ability。

## C. 数学练习：真实 Generative AI 的方法参照

Bastani 等（2025），*Generative AI without guardrails can harm learning: Evidence from high school mathematics*。https://doi.org/10.1073/pnas.2422633122

正式论文的数据与代码仓库：https://github.com/obastani/GenAICanHarmLearning

区分 GPT Base、GPT Tutor 与对照，并评估撤去 AI 后的考试。适合参考工具设计与无辅助测验分离；不能把 GPT Base 直接等同于强制代劳，因为可用工具与实际使用行为不同。

GitHub 目录已核查，版本 2f63dae1a01d51453826fe07ef5cf6678e339588：有分析、题目映射、question_list.csv 等文件；尚未逐题核对完整试卷。作者网页旧稿仍有 GITHUB LINK TBD，当前已存在正式仓库，不能沿用旧稿认定未公开。

研究判断：校内数学材料对成人大众的先备知识与考试焦虑要求较高，不优先整套照搬。

## D. 编程技能：材料可得性较好的方法参照

Shen, J. H., & Tamkin, A. (2026). *How AI impacts skill formation* [Preprint]. https://arxiv.org/abs/2601.20245

仓库：https://github.com/safety-research/how-ai-impacts-skill-formation

原任务学习陌生的 Trio 编程库，使用真实 LLM，并进行后续技能评估。仓库版本 bae6eab7b80ab652d612ff9a9ee2d72dddd754aa 已确认包含 final_task 的说明、起始代码、测试与标注交互记录；未宣称完整原实验平台和全部测验均已复现。

研究判断：能较清楚区分任务完成与技能形成，但要求编程基础，不适合当前成人大众优先目标。不能把观察到的不同交互模式直接当作随机操纵结果。

## 暂不优先的其他方向

Karny 等（2024），*Learning with AI assistance: A path to better task performance or dependence?* https://doi.org/10.1145/3643562.3672610 。移动目标拦截任务有 AI 开关设计，但混合动态规划与知觉运动技能；不优先承载当前的知识学习与产物拥有感模型。原结果也不支持默认 AI 必然损害学习。

## 结论与推进边界

营养判断优先用于审查操纵机制；逻辑排序优先用于审查低领域知识的任务结构。尚无一个候选同时满足完整原材料可得、成人低负担、Generative AI 两种使用模式与拥有感适用性。

下一步应围绕两个候选获取/确认原题库、原解释、评分和题型生成规则。若只能根据方法重建，必须明确标为重建与改编，不能因题材相似继承验证。未经用户明确授权，不发送邮件向作者索取材料。

Psychological Ownership 是目前共同的设计难点：一串答案或排序是否能成为有意义的拥有对象，必须有概念依据与预测试。为此额外增加报告、攻略或说明书，会改变原任务与认知加工，不能默认添加。
