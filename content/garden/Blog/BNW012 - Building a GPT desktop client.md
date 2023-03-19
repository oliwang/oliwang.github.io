---
title: "BNW012 - Building a GPT desktop client"
date: 2023-03-19
tags: ["RSS", "Newsletter", "2023"]
excerpt: "I wanted to package Pynecone but didn't know how. So I rewrote the client with PyQt6."

published: true
scheduled-for: 2023-03-19

stage: IDEA

---

# BNW012 - Building a GPT desktop client

I used to be content with using ChatGPT's web version until I realized that I had to constantly verify that I was human and refresh the page to avoid errors. So, I decided to develop a desktop client for myself.

Here's the Result -> [oliwang/GPTChatClient: Desktop chat app built with OpenAI API and PyQt6.](https://github.com/oliwang/GPTChatClient)

3 Things I learned
- Cloudflare Workers
- PyQt6
- GitHub Action to automatically package my program

Details are in the repo readme file.

I was testing whether I should use `setHtml` or `setMarkdown`, so I asked ChatGPT to generate a simple PyQt6 program that has two `QTextEdit`. You type markdown on the left, the program renders HTML on the right. Below is the exact code that was generated. I didn't change anything and it runs perfectly. Wow, it saved me so much time.

```python
import markdown
from PyQt6.QtGui import *
from PyQt6.QtWidgets import *
from PyQt6.QtCore import *


class MarkdownPreviewWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QHBoxLayout()

        self.text_edit = QTextEdit()
        self.text_edit.setTabChangesFocus(True)
        self.text_edit.textChanged.connect(self.refresh_preview)

        self.preview_edit = QTextEdit()
        self.preview_edit.setReadOnly(True)

        self.layout.addWidget(self.text_edit)
        self.layout.addWidget(self.preview_edit)

        self.setLayout(self.layout)

    def refresh_preview(self):
        md_text = self.text_edit.toPlainText()
        html_text = markdown.markdown(md_text)
        self.preview_edit.setHtml(html_text)


if __name__ == "__main__":
    app = QApplication([])

    window = QMainWindow()
    window.setGeometry(200, 200, 800, 600)

    central_widget = MarkdownPreviewWidget()

    window.setCentralWidget(central_widget)

    window.show()

    app.exec()

```

---
# 📚 Book

## [Teaching Tech Together](https://amzn.to/3Fw3lBu)

![CA](https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41Ak73ui8pL._SX332_BO1,204,203,200_.jpg)

- I learned about this book from a podcast [#12 编程的教学 - 图布读书 | 小宇宙 - 听播客，上小宇宙](https://www.xiaoyuzhoufm.com/episode/63eeb6656b8a212824cdea72?s=eyJ1IjogIjVlZGRjMDc0ODhmNzg4YmI2OWRmMWEzNyJ9) . I listened to about 1/3 of the episode and decided to wait until I finish the book myself to listen to the rest of the show.
- I made a lot of highlights when I was reading. I think I'll spend some time going through my notes.
- I think a lot of people who are teaching CS have more experience writing code than teaching. This book introduced teaching techniques that I can use. For example, Parsons Problems are probably great when teaching Scratch. Some students hesitate when they need to drag a new block to the working area but don't have so many problems switching the order of blocks.

---
# 🔖 Bookmarks

[nacmartin/manitas: Move your fingers in the air to interact with a computer ☝️☝️](https://github.com/nacmartin/manitas?source=oliwang_betternextweek)
- A JavaScript/Typescript library that uses AI to interact with web elements by finger gestures

[Large language models change everything for linguistics, starting with Chomsky](https://twitter.com/spiantado/status/1635276145041235969?s=12&t=-fzE1Pea73SuGbNbtSgOiQ?source=oliwang_betternextweek)
- '"just" fitting parameters is the same thing as theory comparison'

[tatsu-lab/stanford_alpaca: Code and documentation to train Stanford's Alpaca models, and generate the data.](https://github.com/tatsu-lab/stanford_alpaca?source=oliwang_betternextweek)
- "The current Alpaca model is fine-tuned from a 7B LLaMA model on 52K instruction-following data"
- "In a preliminary human evaluation, we found that the Alpaca 7B model behaves similarly to the `text-davinci-003` model on the Self-Instruct instruction-following evaluation suite"

[Gradio](https://gradio.app/?source=oliwang_betternextweek)
- Looks like a great solution to build Machine Learning demos

---

[💌Subscribe](https://tinyletter.com/oliwang) and/or [📧Email](mailto:betternextweek.bnw@gmail.com)


