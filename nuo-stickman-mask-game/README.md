# 傩面具 3D 地图收集小游戏

这是一个独立静态包，可以直接部署到网站目录，也可以用 `iframe` 或 `NuoStickmanGame.mount()` 嵌入现有页面。玩法是 3D 星图地图闯关探索：玩家在地图中移动、跑动和跳跃，穿过火塘村寨、溪谷木桥、山脊密林、海岛祭场四类地形，先激活每关机关，再按当前目标顺序收集面具并解锁下一段路线。

## 玩法控制

- 点击地图：移动到目标位置
- WASD / 方向键：行走与跑动
- 空格 / J / “跳跃”按钮：跳跃
- E / “激活”按钮：靠近心火、石板、纹路或祭台后开启机关
- 靠近当前目标的发光面具节点：按 Enter 或点击“收集”完成采集；收齐本关面具后通关
- F：追踪当前目标，优先前往未激活机关，其次前往当前目标面具
- P：暂停 / 继续
- R：打开重置菜单；C：回到中心
- 1 / 2：切换中国代表 / 世界代表图鉴
- H / ?：打开或关闭快捷键面板；Esc：关闭菜单或暂停
- “重置”按钮：打开游戏内重置菜单，可回到中心、重置本关或重新开始全部进度
- 高障碍需要绕行；低障碍可以跳过；火塘、雾区会减速，巡游火盏会弹开角色
- 每关通关时会显示本关面具祭台，作为本关奖励展示

## 本地预览

```bash
py -m http.server 8777 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8777/nuo-stickman-mask-game/
```

## 嵌入方式

```html
<iframe src="/nuo-stickman-mask-game/index.html" width="100%" height="640" loading="lazy"></iframe>
```

```html
<div id="nuo-game"></div>
<script src="/nuo-stickman-mask-game/game.js"></script>
<script>
  NuoStickmanGame.mount("#nuo-game", {
    assetBase: "/nuo-stickman-mask-game/",
    height: 640,
    sound: false
  });
</script>
```

`mount()` 返回对象保留 `restart()`，并提供 `resetLevel()`、`resetAll()`，方便宿主网站接入自定义按钮。可选回调包含 `onScoreChange`、`onGameOver`、`onMaskCollected` 和 `onMechanismSolved`。

`game.js` 会自动加载同目录下的 `style.css`、`data/game-data.json` 和 `vendor/three.module.min.js`。面具图片使用本地 SVG 矢量线稿，适合嵌入暗色傩面万象页面。
