# 逻辑排序实验：研究者测试分享包

整理日期：2026-10-20。网页 participant-01；题库 logic-bank-01。

本包仅包含当前网页、定稿材料及档案引用的三个历史核查文件。未包含浏览器缓存、运行环境、原论文 PDF 或任何参与者作答记录。

## 先看哪里

1. 本地测试：先把整个 ZIP 解压到普通文件夹，再用电脑浏览器打开 `researcher.html`。不要在压缩软件内部直接打开 HTML。
2. 在线测试：仓库开启 GitHub Pages 后，打开 `网站地址/researcher.html`，分别点击检查代劳版与检查辅助版。
3. 先读 `docs/rationale.html`：为什么选逻辑排序、原研究来源、六篇参考文献和改编边界。
4. 再读 `docs/materials.md`：逐题内容、评分键与 AI 局部回复。
5. 当前实施说明在 `docs/protocol.md`。不需要安装 Python、Node 或接入 API。

当前流程：1 道操作练习 → 4 道 AI 协作题 → 2 旧＋2 新无 AI 测验 → 结束说明 → 手动下载记录。量表尚未接入。

两次体验会受到记忆和练习影响，仅供研究者检查界面，不作为正式被试数据。此版本用于预测试准备，实际题目难度和操纵效果尚待参与者数据检验。

## 上传 GitHub：最关键的一步

**上传本文件夹里面的全部内容，让 `index.html` 直接位于仓库第一层；不要只上传 ZIP，也不要再套一层 research 文件夹。**

正确结构：

```
仓库首页/
  index.html
  researcher.html
  app.js
  core.js
  style.css
  dialogue.css
  README.md
  .nojekyll
  .gitignore
  docs/
    rationale.html
    rationale.md
    materials.md
    protocol.md
    audit.json
    history/
```

在新仓库中选择 Add file → Upload files，把本文件夹中的文件和 docs 文件夹一起拖入上传区，提交后检查仓库首页能直接看到 index.html。网页资源用相对路径，无需修改。

## 两种分享方式

### A. Private 仓库＋邀请协作者

新建 Private 仓库并上传本包，在仓库 Settings → Collaborators（界面名称可能略有差异）邀请她的 GitHub 账号。她接受邀请后，在 Code → Download ZIP 下载、完整解压，再打开 researcher.html。

这条路径不需要 GitHub Pages。GitHub 的代码页面不会把 HTML 直接运行成实验网页。不要把仓库 README 链接当成可作答的网址。

### B. 网址测试：Public 仓库＋GitHub Pages

GitHub Free 可对 Public 仓库开启 Pages。创建仓库（例如 huangrui-logic-study），上传后打开 Settings → Pages，在 Build and deployment 中选择：

- Source：Deploy from a branch
- Branch：main（如果实际默认分支名称不同，选实际分支）
- Folder：/(root)
- 点击 Save，等待部署完成后使用页面提供的 Visit site 地址。

站点通常为 `https://你的用户名.github.io/仓库名/`，这是格式示例，实际地址以 GitHub 显示为准。研究者入口在该地址后加 `researcher.html`。

可检查的三种入口：

- `网站地址/researcher.html`：研究者检查两种模式并查看材料。
- `网站地址/index.html?condition=delegated`：指定代劳条件。
- `网站地址/index.html?condition=assisted`：指定辅助条件。

裸站点或 index.html 使用浏览器本地随机分组，不保证组人数均衡。当前没有服务器分配或防止重复参与的机制。

公开站点和代码可被别人访问，本包也包含题目与答案。若仅限研究者内部查看，优先采用 A。不要把参与者导出的作答记录上传到公开仓库。付费方案可支持 Private 仓库的 Pages，但 Private 仓库不自动代表网站访问也私密。

## 数据如何交回

Pages 只承载网页，不会自动收集答案。黄蕊测试完成或主动退出后，点击「下载作答记录」，将 JSON 文件发回研究者。刷新、关闭或崩溃可能丢失未导出的页面记录。不能把完成页面或下载按钮视为研究者已收到数据。

## 已核查和未核查

- 程序资源与站内链接已核查；核心运行文件与当前本地版本一致。
- 原版本已通过两组九次作答的状态与渲染检查，并核查六道正式题结构匹配与唯一解。
- 分享包未上传、未开启 Pages；没有远程部署结果或网络可用性验证。
- 实际浏览器视觉、手机适配及正式实验数据收集仍需另行核查。建议电脑测试。

## GitHub 官方说明

- [上传文件](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [创建 GitHub Pages 站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [配置 Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

当前分享不代表为引用论文、第三方框架或全部材料授予额外许可；论文原文通过链接访问。正式公开复用前应分别确认材料使用条件，不自动给整个项目套用开源许可证。
