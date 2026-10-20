# 黄蕊：购票与决策学习材料核查

核查日期：2026-10-19。目的：寻找可理解、可客观评分、具有原材料依据的替代任务。Alien Zoo 草案暂存，不作为当前首选。

## 判断

确有 LLM 辅助订票的人类实验，也有航空优惠券的经典决策实验；本轮没有确认到同时满足「生成式 AI 使用模式操纵、最大折扣任务、撤去 AI 后的学习检验」的现成研究。不能把三类证据合并称作一个已验证的实验范式。

建议优先审查 Becker 等（2022）的 Road Trip 材料，借鉴 Callaway 等（2022）的训练后独立测验结构；He 等（2025）用于参考人机分工。此建议属于研究设计判断，尚无证据证明它一定比 IKEA 报告更有趣、更简单。

## 1. 真正的 LLM 辅助订票：He 等（2025）

原文：https://arxiv.org/html/2502.01390

材料：https://github.com/RichardHGL/CHI2025_Plan-then-Execute_LLMAgent

研究采用 2 × 2 设计：是否参与规划 × 是否参与执行，分析样本 N = 248。订票只是六项任务之一，要求完成伦敦与阿姆斯特丹间指定时段的往返预订，并非最大折扣学习。原研究测量信任、规划质量、执行准确性等，没有独立学习测验。

已经核查仓库目录：任务 JSON、flight_tool.py、指导语模板、规划与执行界面、ground_truth.json、匿名数据和分析程序均有对应文件。仓库核查版本：3c478386823d98f4dee93ed6eff86bb1539177e9。本轮没有部署运行。

可借鉴：自动完成与参与修改的操作方式、模拟订票场景、正确执行标准。必须新增：可学习的目标策略、多道等结构新题、撤去辅助的测验，以及本课题的 Sense of Agency、Psychological Ownership、Perceived Learning 测量。只保留两端条件或改变 AI 回复方式后，属于改编，不能继承原研究的操纵效度。

## 2. 熟悉情境的策略任务：Becker 等（2022）

原文：https://doi.org/10.1007/s42113-022-00149-y

材料：https://github.com/RationalityEnhancement/InterpretableStrategyDiscovery/tree/master/BehavioralExperiments/02_DNF2LTL_experiments_22

论文 Appendix 3 提供 Road Trip 与 Mortgage 的参与者指导语。Road Trip 要求为客户规划低成本路线，查询酒店价格有成本，因此需要学习先查什么、查到何时停止。它不是单纯寻找最低可见价格。

原研究检验 AI-generated decision aids 是否改善决策；AI 主要用于发现和表达策略，不能等同于 LLM 或 Generative AI。其辅助下表现证据不能直接证明撤去辅助后的独立学习。

已核查该子目录 README 明确对应本论文。Exp2/Experiment/static/ 下可定位地图、指导语图、jsPsych 程序、roadtrip_trials.json、roadtrip_trials_singleLow.json。已读取 roadtrip_trials.json，包含 16 个条目和图结构等字段；尚未逐题核对实际调用文件、练习/正式试次划分及运行时如何设置价格，不能把文件条目数当作原实验正式题数，也不能宣称可立即使用。核查版本：caa27014b57270b2e8974c14c54a74a3d48b9850。

可保留：路线图、查询成本、价格环境、搜索与停止的决策结构。必须处理：中文理解、AI 使用模式、无辅助新题、主观量表适用性。论文正文材料按其 CC BY 4.0 及第三方例外执行；仓库代码和图片的许可须分别核对。

## 3. 学会与迁移的证据：Callaway 等（2022）

原文：https://doi.org/10.1073/pnas.2117432119

作者全文：https://cocosci.princeton.edu/papers/callawayleveraging.pdf

材料：https://github.com/fredcallaway/ai-for-improving-human-planning

Mouselab-MDP 通过有成本的点击揭示结果信息。原研究比较 metacognitive feedback、action feedback 和无反馈，包含训练后测验、更复杂的飞行规划迁移及 24 小时保持检验。它提供策略学习可以被客观检验的依据，但不验证黄蕊的 AI 使用模式与链式中介模型。

仓库含数据、分析与改为可自行选择条件的 Experiment 1 演示；不能据此宣称全部实验原界面均完整公开。核查版本：d841b0fa3ba493bec5c17ddee0821c287fb7e2ef。

可借鉴训练/独立测验分离，以及搜索过程指标。删除原反馈惩罚、改变试次数、改用 LLM 后，需要重新检验学习效果；不能套用原文效果量作为改编效果的保证。

## 4. 真正的航空优惠券任务：Shu（2008）

原文：https://doi.org/10.1002/bdm.593

作者机构全文及 Attachment 1 原指导语：https://anderson-review.ucla.edu/wp-content/uploads/2021/03/Shu_FutureBiasSearch_2008.pdf

参与者连续多周购买机票，在价格不确定时决定何时用免费券与七折券。原研究考察 future-biased search 与最优使用时机，没有 AI 使用模式或独立学习检验。

其原指导语可查，但本轮没有确认完整运行程序、原试次序列与全部素材。缩短时限、取消概率或预先展示全部价格会改变 sequential decision problem。最终省钱数同时受价格随机性影响，应评估基于当时信息的策略质量，不能只用事后总优惠评分。

## 5. 面向本课题的改编边界

首选候选：Road Trip。训练期对比 AI 代劳与 AI 辅助决策；测试期移除辅助，使用未见题目。该结构为建议，尚未定稿。

1. 两组需要接触可比的任务信息与策略解释。否则组间差异同时反映教学内容、练习量和控制权差异。
2. 记录有 AI 时表现与无 AI 时表现，分别报告。若没有基线或适当控制，独立测验表现应称为 post-task performance，不能直接称为 learning gain。
3. 搜索先后、查询数、停止时机和选择表现需依原环境定义。减少查询不必然更好；不能以事后全知最优路线替代不完全信息下的合理策略基准。
4. Psychological Ownership 必须指向清晰产物，例如本轮提交的路线方案。另加策略卡可能引入写作与额外认知加工，不能默认加入，也不能声称产物拥有感等于知识拥有感。
5. 预生成并固定 AI 内容时，应准确报告 standardized/pre-generated AI assistance。普通人工脚本不能直接写成实时 Generative AI 交互。
6. 开题中的写作相关 Perceived Learning 条目须逐题审查。任务先例不等于量表适用性或整条链式中介成立。

下一步是做 Road Trip 原材料与运行规则逐项对照，再用一页纸呈现一轮真实操作及独立测验示例。试次数和时长由理解测试与预测试确定。当前不建网页、不把原材料尚未核实的题目填成正式实验。

## 参考文献

Becker, F., Skirzyński, J., van Opheusden, B., & Lieder, F. (2022). Boosting human decision-making with AI-generated decision aids. *Computational Brain & Behavior, 5*, 467–490. https://doi.org/10.1007/s42113-022-00149-y

He, G., Demartini, G., & Gadiraju, U. (2025). Plan-then-execute: An empirical study of user trust and team performance when using LLM agents as a daily assistant. In *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems*. https://doi.org/10.1145/3706598.3713218

Shu, S. B. (2008). Future-biased search: The quest for the ideal. *Journal of Behavioral Decision Making, 21*(4), 352–377. https://doi.org/10.1002/bdm.593

Callaway, F., Jain, Y. R., van Opheusden, B., Das, P., Iwama, G., Gul, S., Krueger, P. M., Becker, F., Griffiths, T. L., & Lieder, F. (2022). Leveraging artificial intelligence to improve people’s planning strategies. *Proceedings of the National Academy of Sciences, 119*(12), e2117432119. https://doi.org/10.1073/pnas.2117432119
