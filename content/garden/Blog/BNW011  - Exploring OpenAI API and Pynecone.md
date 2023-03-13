---
title: "BNW011 - Exploring OpenAI API and Pynecone"
date: 2023-03-13
tags: ["RSS", "Newsletter", "2023"]
excerpt: "One day late again."

published: true
scheduled-for: 2023-03-12

stage: DONE

---

# BNW011 - Exploring OpenAI API and Pynecone

I'm tired of constantly refreshing and verifying that I am human. So I decided to build a local ChatGPT client. I had read about Pynecone, a Python full-stack web app development framework, a while ago and had always wanted to try it.


## Using Cloudflare workers as a proxy

I mainly followed this tutorial [使用 Cloudflare Workers 解决 OpenAI 和 ChatGPT 的 API 无法访问的问题 · noobnooc/noobnooc · Discussion #9](https://github.com/noobnooc/noobnooc/discussions/9) and bought a 99 cents domain from [99 Cent Domain Name Registration | $1 Coupons - Namecheap](https://www.namecheap.com/promos/99-cent-domain-names/). To add this domain to Cloudflare I just followed the instructions on the website. Later I found this guide [How to set up DNS records for your domain in Cloudflare account - Hosting - Namecheap.com](https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-cloudflare-account/). The only tricky part for me was setting up the nameservers because I had never done that before. After that, I waited for about 15 minutes and the site became active.

## Pynecone

My expectation was that I could finish the simple client in 1 or 2 hours. But it actually took much longer.

1.Python version

I declared a class Diaglog to store role and content information. For each session, I have a dialogs variable with an array of Dialog objects. Python always gives me an error when I try to access `dialog.role` or `dialog.content`. I tried to type annotate the dialogs variable with `list[Dialog]`. A different error. After several fruitless google searches, I suddenly realized that type hinting has changed since Python 3.10. My environment was Python 3.8. So I created a 3.11 environment and the error disappeared.

2.Async?

Pynecone's button component has an `is_loading` field which is perfect for signaling the user "Your input has been sent, please wait before an answer is returned". However, when I tried to change the loading state by changing the boolean variable linked to `is_loading`, it doesn't work. I think it has something to do with blocking, sync, async? The fix is quite simple. Instead of putting everything in one function, have separate functions and chain them together.

```python
pc.button(
	"Send",
	bg="lightblue",
	color="black",
	is_loading=State.is_loading,
	on_click=[State.toggle_loading, State.send_message, State.toggle_loading, State.clear_input_text],
),
```

I like Pynecone a lot but I need to read the document closely before I build anything serious with it.

## Next Steps

- The cursor moves to the end whenever I make changes in the input. And the input does not work with Chinese pinyin input. Have to figure out what to do with that.
- Can I pack the program into an executable with PyInstaller or something similar?


---
# 📚 Book

[168 Hours](https://amzn.to/3lafa9y)

![CA | 300](https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51fqA1WvlrL.jpg)

- There are 168 hours in a week. 
- Most people have false beliefs about how much time they spend working and how much time they relax and spend on activities such as watching TV. Before making decisions about time, keep a record of how you actually spend your day and week first.
- Record, Analyze, Prioritize, Outsource, and Improve.
- If you want to use your time efficiently, plan ahead. Plan your leisure time as well.
- If you have read a dozen of time-management/productivity books, like me, there is nothing really new in this book.



---
# 🔖 Bookmarks

[cocktailpeanut/dalai: The simplest way to run LLaMA on your local machine](https://github.com/cocktailpeanut/dalai?source=oliwang_betternextweek)
- Looks really simple. Have to try it sometime.


[如何用 ChatGPT 构建你的专属知识问答机器人](https://blog.frankzhao.cn/build_gpt_bot_for_doc/?source=oliwang_betternextweek)
- I have been thinking about how to provide detailed descriptions in prompt while keeping my token number below the limit. Maybe I should try fine-tuning text-davinci-003 first?

[jerryjliu/llama_index: LlamaIndex (GPT Index) is a project that provides a central interface to connect your LLM's with external data.](https://github.com/jerryjliu/llama_index?source=oliwang_betternextweek)
- Or maybe I can try GPT-index?

[Noam Chomsky: The False Promise of ChatGPT](https://www.nytimes.com/2023/03/08/opinion/noam-chomsky-chatgpt-ai.html?source=oliwang_betternextweek)
- Many people are excited to ask ChatGPT questions and find out what it "thinks" because of the name "artificial intelligence." However, it's important to remember that ChatGPT doesn't actually think. When you ask questions like "how will AI develop?" The answers you receive are generated by statistical analysis of data gathered from pre-written posts made by people.
- Is "true intelligence" limited to "human intelligence"? The first airplanes were inspired by birds, but modern aircraft have very different mechanisms for flying. Yet, they still fly. So, while true intelligence doesn't necessarily have to be human-like, it should still be able to accomplish tasks effectively.




---

[💌Subscribe](https://tinyletter.com/oliwang) and/or [📧Email](mailto:betternextweek.bnw@gmail.com)


