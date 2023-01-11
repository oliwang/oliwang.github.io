---
title: How to use Chinese and other Non-Latin Characters in jimp
date: 2023-01-11
tags:
  - develop
  - code
  - Blog
  - node.js
  - "2023"
  - RSS
excerpt: I spent the whole afternoon figuring out how to use Chinese characters in Jimp. Here's how I did it.
published: true
scheduled-for: 2023-01-11
stage: DONE
---

# How to use Chinese and other Non-Latin Characters in jimp


I followed [How to generate social media banners for Gatsby automatically? | An Tran](https://antran.app/2022/gatsby_seo_banner/) to automatically generate image for each of my blog posts with a module called [jimp](https://github.com/oliver-moran/jimp). It worked OK until I wrote a post in Chinese. The Chinese characters are printed as "?" on the image. I think the same would happen for the other non-latin languages.

This seems like an easy problem to solve. Just load a font that supports Chinese characters.

But if you have never used `.fnt` fonts before, there's a lot of googling to find the solution. 

---

## Step 1: Download a `.ttf` font

This is the easy step. You can use [Google Fonts](https://fonts.google.com/). I downloaded my Chinese font from [站酷字库 - 付费字体 & 免费字体 - 站酷 (ZCOOL)](https://www.zcool.com.cn/special/zcoolfonts/).


## Step 2: Download Hiero

[Hiero](https://libgdx.com/wiki/tools/hiero) is the program I used to convert `.ttf` to `.fnt`. You can download the `.jar` file and double click on it to run (at least on a Mac). I tried various online tools because I thought I have to install dependencies and compile Java code in order to run Hiero. No, you just need to double click. None of the online tools I tried worked for Chinese fonts.

Now you can choose the `.ttf` font you downloaded in previous step.

![Hiero](https://imagehosting-ow.oss-cn-hangzhou.aliyuncs.com/202301111955327.png)


## Step3: Find out what characters are in the font

If you directly export the `.fnt` file in step 2, you will see that only characters in sample text were exported. No Chinese characters. You have to add all characters you might use to sample text.

![Sample Text](https://imagehosting-ow.oss-cn-hangzhou.aliyuncs.com/202301112022999.png)

So the question becomes: how do I get all the characters? I know the `.ttf` file must have information about all the characters it supports, but how do I get them?

I modified python code from [python提取ttf文件包含的所有字符_潘旭阳的博客-CSDN博客_python 提取ttf字体中字符的字模信息](https://blog.csdn.net/Joseph__Lagrange/article/details/118021733) a little bit, and saved the characters to my clipboard. Now I just need to paste them to sample text.

```python
from fontTools.ttLib import TTFont
import subprocess 
data = ""

def get_char_list_from_ttf(font_file):
    f_obj = TTFont(font_file)
    m_dict = f_obj.getBestCmap()
    
    unicode_list = []
    for key, _ in m_dict.items():
        unicode_list.append(key)
        
    char_list = [chr(ch_unicode) for ch_unicode in unicode_list]
    return char_list
 
font_file = '站酷庆科黄油体.ttf'
chars = get_char_list_from_ttf(font_file)
for i in range(len(chars)):
    if i%20 == 0:
        data += "\n"
    data += chars[i]

subprocess.run("pbcopy", text=True, input=data)
```


## Step 4: Set font size, background color, color

Background needs to be transparent. You can click on Background, choose RGB tab, set Alpha to 0, click OK.

Set other effects if you need.

![Effects](https://imagehosting-ow.oss-cn-hangzhou.aliyuncs.com/202301112025485.png)


## Step 5: Export `.fnt` file

Click File - Save BMFont files. Give the file an appropriate name.

![Export](https://imagehosting-ow.oss-cn-hangzhou.aliyuncs.com/202301112026837.png)

If your language has thousands of characters like Chinese, you'll have to wait a little before all the `.png` files are generated. Put all `.fnt` and `.png` file to your project. Use it in jimp with `loadFont()`.

---

Hope you find this Post helpful. [💌Subscribe](https://tinyletter.com/oliwang) and/or [📧Email](mailto:betternextweek.bnw@gmail.com)