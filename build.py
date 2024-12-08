from jinja2 import Environment, FileSystemLoader, TemplateNotFound, select_autoescape
from os.path import join, exists, getmtime

variables= {
    "navigation": ["item 1", "item 2", "item 3"]
}

class MyLoader(FileSystemLoader):

    def __init__(self, path):
        self.path = path

    def get_source(self, environment, template):
        path = join(self.path, template)
        if not exists(path):
            raise TemplateNotFound(template)
        mtime = getmtime(path)
        with open(path) as f:
            source = f.read()
        return source, path, lambda: mtime == getmtime(path)

f = open("posts/human-kinds-to-do-list.html")
content = f.read()
variables["content"] = content
env = Environment(loader = MyLoader("styles/templates"))
template = env.get_template("generic.html")
blog = template.render(variables)
f.close()

newfile = open("site/testblog.html", "w")
newfile.write(blog)
newfile.close()