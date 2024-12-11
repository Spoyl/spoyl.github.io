from jinja2 import Environment, FileSystemLoader, TemplateNotFound, select_autoescape
from os.path import join, exists, getmtime


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

env = Environment(loader = MyLoader("posts"))
template = env.get_template("how-to-travel-for-free.html")
blog = template.render()
newfile = open("site/testblog.html", "w")
newfile.write(blog)
newfile.close()