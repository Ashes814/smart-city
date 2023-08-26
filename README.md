# [App]第 8 期：城市场景可视化及空间分析项目(TS, React, Mapbox, L7, Geoserver, PostGIS)

> `源码:` [https://github.com/Ashes814/smart-city](https://github.com/Ashes814/smart-city)

# 功能展示

- UI 界面核心有三部分构成,`左侧数据图表区`,`顶部功能按钮`,`右侧地图展示区`

![UI界面](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled.png)

UI 界面

- `图层信息查询功能`:以土地利用信息查询为例,通过 L7 加载图层信息,展示信息弹窗

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%201.png)

- `三维建筑可视化及信息查询:`单击建筑可飞入建筑位置并弹出具体信息

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%202.png)

- 通过加载不同图层,展示不同可视化信息,以城市间航线为例

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%203.png)

- 交通事故查询及缓冲区空间分析

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%204.png)

# 系统架构

- 应用表现层

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%205.png)

- 简单架构

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%206.png)

# 后端问题解决

- 数据库备份,通过`pg_restore`恢复数据库

```bash
pg_restore -d your_database_name your_dump_file.dump
```

![Untitled](%5BApp%5D%E7%AC%AC8%E6%9C%9F%EF%BC%9A%E5%9F%8E%E5%B8%82%E5%9C%BA%E6%99%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8F%8A%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE/Untitled%207.png)

- Geoserver 安装时注意 JAVA 版本
- [Geoserver 跨域问题](https://juejin.cn/post/7088484003954556964)

# 前端问题解决

- 简单粗暴的安装方式

```bash
npm install --force
npm run
```
