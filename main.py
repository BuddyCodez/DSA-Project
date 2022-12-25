import eel
eel.init('TextEditor')

Redo = []
stack = []
Str = ''

@eel.expose
def append(string: str):
    global Str
    Str = string
    stack.append(Str)
    print(stack)
    return stack
@eel.expose
def undo():
    if len(stack) > 0:
        Redo.append(stack[-1])
        stack.pop()
        print(stack[-1])
        return stack[-1]
    else :
        return stack
@eel.expose
def redo():
    if len(Redo) > 0:
        stack.append(Redo.pop())
        print(stack)
        return stack[-1]
@eel.expose
def delete(string):
    print(string)
    global Str
    Str = Str[:-int(string)]
    stack.append(Str)




# ! Start the server:
eel.start('index.html')