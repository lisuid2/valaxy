---
layout: post
title: 部署雷池waf防护自己的网站
tags:
   - 教程
   - 雷池
categories:
   - 教程
   - 雷池
cover: /Img (7).webp
abbrlink: 67e36e3e
date: 2024-03-09 21:12:38
---
# 雷池简介
什么是雷池

雷池（SafeLine）是长亭科技耗时近 10 年倾情打造的 WAF，核心检测能力由智能语义分析算法驱动。

Slogan: 不让黑客越雷池一步。

官网链接:https://waf-ce.chaitin.cn/
Github:https://github.com/chaitin/SafeLine
# 什么是WAF
WAF 是 Web Application Firewall 的缩写，也被称为 Web 应用防火墙。

区别于传统防火墙，WAF 工作在应用层，对基于 HTTP/HTTPS 协议的 Web 系统有着更好的防护效果，使其免于受到黑客的攻击。

# 安装waf
配置需求

- 操作系统：Linux
- 指令架构：x86_64
- 软件依赖：Docker 20.10.14 版本以上
- 软件依赖：Docker Compose 2.0.0 版本以上
- 最小化环境：1 核 CPU / 1 GB 内存 / 5 GB 磁盘

可以逐行执行以下命令来确认服务器配置
```SHELL
uname -m                 # 查看指令架构
docker version           # 查看 Docker 版本
docker compose version   # 查看 Docker Compose 版本
docker-compose version   # 同上（兼容老版本 Docker Compose）
cat /proc/cpuinfo        # 查看 CPU 信息
cat /proc/meminfo        # 查看内存信息
df -h                    # 查看磁盘信息
```
安装方式
根据实际情况选择安装方式，支持一键安装

- 在线安装 : 推荐方式，一行命令完成安装
- 离线安装 : 下载离线安装包，轻松完成安装
- 其他方式安装 : 使用牧云助手，点击即可完安装
# 在线安装waf
官方有三种安装方式供选择，在本教程中使用一键在线安装

执行一下命令，即可开始安装
```SHELL
bash -c "$(curl -fsSLk https://waf-ce.chaitin.cn/release/latest/setup.sh)"
```
如果运行中显示缺少docker环境按Y即可，等待安装完成
![1](https://s3.qjqq.cn/3/65ed0c9f8ad0c.webp!color)

如何显示docker容器安装失败可以尝试华为云加速
```SHELL
CDN=1 bash -c "$(curl -fsSLk https://waf-ce.chaitin.cn/release/latest/setup.sh)"
```
安装好雷池后在浏览器打开后台管理页面 ```https://<waf-ip>:9443```。根据界面提示，手机下载使用 支持 ```TOTP``` 的认证软件 扫描二维码，然后输入动态口令登录。
> 注意：如果打不开后台管理页面，请放行端口号


![2](https://s3.qjqq.cn/3/65ed10053fd9e.webp!color)

# 配置防护站点
接下来我们需要在宝塔上添加站点，我们是在网站服务器里面部署，不能走80 443 8080
![PY@I3GZC1MVP[5L8]IJB95J.webp](https://s3.qjqq.cn/3/65ed122fe06e2.webp!color)

端口：80 因为我的WAf和站点在同台服务器上，所以上游服务器写的是```127.0.0.1:8000```，根据自己情况修改。
![C1G`F7$TR$A_N@IXYYA3VA.webp](https://s3.qjqq.cn/3/65ed13363762f.webp!color)
如何需要添加ssl端口号填443，上传自己的证书

本教程是在网站服务器上部署雷池

```提示```
 不建议这样部署，因为这样单机的负载更高、设备宕机的概率更大。非纯净的环境还会提高安装失败的概率，故障排查也会比较困难。
如果你能接受这些风险，雷池waf可以在网站服务器上部署，如图

![55](https://waf-ce.chaitin.cn/docs/assets/images/deploy_on_web_server-74afa9db5a5c45e45f46661543e9af5e.svg)


```推荐```
你可以提供一台独立服务器部署雷池waf，那么你需要：
1.将网站流量指向雷池。例如将域名解析到雷池
2.禁止网站服务器上，所有除了雷池之外的访问。例如配置防火墙，或者直接把网站服务器放到内网，参考如下图

![222](https://waf-ce.chaitin.cn/docs/assets/images/deploy_on_separate_server-6f376e22ec3b90de6a83d048b28e95e3.svg)

# 测试防护
接下我们使用手动或自动的方式测试长亭雷池waf的效果

打开浏览器，访问以下地址即可模拟出对应的攻击：
- 模拟 SQL 注入，请访问 ```http://<IP或域名>:<端口>/?id=1%20AND%201=1```

- 模拟 XSS，请访问 http://<IP或域名>:<端口>/?html=< script>alert(1)< /script>
通过浏览器，你将会看到雷池已经发现并阻断了攻击请求。

若请求没有被阻断，请参考 [配置问题](https://waf-ce.chaitin.cn/docs/faq/config)
整体流程参考：
![7](https://waf-ce.chaitin.cn/docs/assets/images/flow-f8fc68b957b3b02950d85ac9a18dcdc9.svg)

# 自动化测试防护效果
两条请求可能无法完整的测试雷池的防护效果，可以使用 blazehttp 自动化工具进行批量测试
# 下载测试工具
- [Windows版本](https://waf-ce.chaitin.cn/blazehttp/blazehttp_windows.exe)
- [Mac版本(x64)](https://waf-ce.chaitin.cn/blazehttp/blazehttp_mac_x64)
- [Mac 版本(M1)](https://waf-ce.chaitin.cn/blazehttp/blazehttp_mac_m1)
- [Linux 版本(x64)](https://waf-ce.chaitin.cn/blazehttp/blazehttp_linux_x64)
- [Linux 版本(ARM)](https://waf-ce.chaitin.cn/blazehttp/blazehttp_linux_arm64)
- [源码仓库](https://github.com/chaitin/blazehttp)
# 准备测试样本
- [测试样本](https://waf-ce.chaitin.cn/blazehttp/testcases.zip)

下载请求样本后解压到```testcases```目录
# 开始测试
1.将测试工具 ```blazehttp ```和测试样本 ```testcases``` 放在同一个目录下
进入对应的目录
使用以下请求开始测试

```
./blazehttp -t http://<IP或域名>:<端口>
```
# 测试效果展示
```
# 测试请求
.//blazehttp -t http://127.0.0.1:8888
sending 100% |█████████████████████████████████████████████████████████| (33669/33669, 940 it/s) [35s:0s]
总样本数量: 33669    成功: 33669    错误: 0
检出率: 71.65% (恶意样本总数: 575 , 正确拦截: 412 , 漏报放行: 163)
误报率: 0.07% (正常样本总数: 33094 , 正确放行: 33071 , 误报拦截: 23)
准确率: 99.45% (正确拦截 + 正确放行）/样本总数
平均耗时: 1.00毫秒
```
# 升级雷池
```注意```
升级雷池时服务会重启，流量会中断一小段时间，根据业务情况选择合适的时间来执行升级操作。

# 在线升级
执行以下命令进行升级，升级并不会清除历史数据。
```
bash -c "$(curl -fsSLk https://waf-ce.chaitin.cn/release/latest/upgrade.sh)"
```

如何需要华为云加速，可使用
```
CDN=1 bash -c "$(curl -fsSLk https://waf-ce.chaitin.cn/release/latest/upgrade.sh)"
```
如果需要升级到最新版本流式检测模式，可使用
```
STREAM=1 bash -c "$(curl -fsSLk https://waf-ce.chaitin.cn/release/latest/upgrade.sh)"
```
# 离线镜像
适用于 docker hub 拉取镜像失败的场景，手动更新镜像。
>  cd /path/to/safeline
 
> mv compose.yaml compose.yaml.old
> wget "https://waf-ce.chaitin.cn/release/latest/compose.yaml" --no-check-certificate -O compose.yaml
> wget "https://waf-ce.chaitin.cn/release/latest/seccomp.json" --no-check-certificate -O seccomp.json
> sed -i "s/IMAGE_TAG=.*/IMAGE_TAG=latest/g" ".env"
> grep "SAFELINE_DIR" ".env" > /dev/null || echo "SAFELINE_DIR=$(pwd)" >> ".env"

grep "IMAGE_TAG" ".env" > /dev/null || echo "IMAGE_TAG=latest" >> ".env"

grep "MGT_PORT" ".env" > /dev/null || echo "MGT_PORT=9443" >> ".env"
grep "POSTGRES_PASSWORD" ".env" > /dev/null || echo "POSTGRES_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >> ".env"
grep "REDIS_PASSWORD" ".env" > /dev/null || echo "REDIS_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >> ".env"
grep "SUBNET_PREFIX" ".env" > /dev/null || echo "SUBNET_PREFIX=172.22.222" >> ".env"


下载 [```雷池社区版镜像包```](https://demo.waf-ce.chaitin.cn/image.tar.gz) 并传输到需要安装雷池的服务器上，执行以下命令加载镜像

```
docker load -i image.tar.gz
```

执行以下命令替换 Docker 容器

```
docker compose down --remove-orphans
docker compose up -d
```    



