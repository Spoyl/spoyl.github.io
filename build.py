from jinja2 import Environment, FileSystemLoader, TemplateNotFound, select_autoescape
from os.path import join, exists, getmtime


class MyLoader(FileSystemLoader):

    def __init__(self, path):
        self.path = path
        super(MyLoader, self).__init__(path) # This is strange, I wouldn't expect to have to call the parent class

    def get_source(self, environment, template):
        path = join(self.path, template)
        if not exists(path):
            raise TemplateNotFound(template)
        mtime = getmtime(path)
        with open(path) as f:
            source = f.read()
        return source, path, lambda: mtime == getmtime(path)


env = Environment(loader = MyLoader("posts"))
blogs = env.list_templates()
for templ in blogs:
    blog = env.get_template(templ)
    newfile = open("site/"+templ, "w")
    newfile.write(blog.render())
    newfile.close()
