---
layout: post
title: 判断网站CDN是否生效
tags:
   - CDN
categories:
   - CDN
cover: 'https://s3.qjqq.cn/3/65aa841db3d54.webp!color'
abbrlink: 870b86a3
date: 2024-01-19 20:12:13
---
> 我们在使用CDN时，除了本身CDN线路上的速度加持和隐藏源站IP和防御等等，为了减轻源站压力达到更好的访问速度你可以配置缓存规则但是很多小伙伴配置了缓存却不知道缓存是否生效

 # **判断教程**
```准备工具```:电脑、Edge或谷歌浏览器
```教程```在你得edge浏览器或者谷歌浏览器-鼠标右键选择检查，或者按F12打开开发者工具
选择网络并使用“Ctrl+F5”清除本地缓存方式刷新网站-选择你缓存规则中所缓存的文件，我选择得是css文件
![1](https://s3.qjqq.cn/3/65abc28f4bb35.webp!color)

在响应头中找到“```x-cache```”开头并在后面看到```HIT```（击中）而不是```MISS```（闪避）即为缓存命中并确定为生效~

- ```通用图片缓存规则```：
类型：后缀名
内容：bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng|jpeg|mp3|mp4
有效期：7天

简单说明：该缓存规则主要就是一些图片、音频、视频等文件一般这种静态文件更新不频繁就可以适当将过期时间拉长几乎可以满足90%的场景

- ```通用js、css等缓存规则```:
类型：后缀名

内容：js|css|txt|xml|html|htm

有效期：60秒
简单说明：js、css、txt、xml这些文件属于更新稍微较频繁的文件，如果你想快速看到修改上传后的内容可以设置时间短一点缓存刷新的时间快，如果你的网站中的内容并不经常更新可以将有效期可以修改为一天看个人情况
