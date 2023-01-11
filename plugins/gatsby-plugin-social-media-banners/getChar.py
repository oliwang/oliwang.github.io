from fontTools.ttLib import TTFont

def get_char_list_from_ttf(font_file):
    f_obj = TTFont(font_file)
    m_dict = f_obj.getBestCmap()
    
    unicode_list = []
    for key, _ in m_dict.items():
        unicode_list.append(key)
        
    char_list = [chr(ch_unicode) for ch_unicode in unicode_list]
    return char_list
 
font_file = '方正新楷体_GBK(完整).TTF'
chars = get_char_list_from_ttf(font_file)
print(chars)
