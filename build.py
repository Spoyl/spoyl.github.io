from jinja2 import Environment, FileSystemLoader, TemplateNotFound, select_autoescape
from os.path import join, exists, getmtime


class MyLoader(FileSystemLoader):

    def __init__(self, path):
        self.path = path
        super(MyLoader, self).__init__(path) #this is required to access the searchpath atrribute, which is necessary to access the list_templates method

    def get_source(self, environment, template):
        path = join(self.path, template)
        if not exists(path):
            raise TemplateNotFound(template)
        mtime = getmtime(path)
        with open(path) as f:
            source = f.read()
        return source, path, lambda: mtime == getmtime(path)


class generate_posts():
    
    def __init__(self, path, loader_obj):
        self.path = path
        self.loader_obj = loader_obj
        self.env = Environment(loader=loader_obj(path))

    def generate(self):
        blogs = self.env.list_templates()
        # formatted list of blog titles
        for templ in blogs:
            blog = self.env.get_template(templ)
            newfile = open("site/"+templ, "w")
            newfile.write(blog.render())
            newfile.close()        

poster = generate_posts("posts", MyLoader)
poster.generate()

