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


class generate_site():
    
    def __init__(self, path, loader_obj):
        self.path = path
        self.loader_obj = loader_obj
        self.env = Environment(loader=loader_obj(path))
        self.navigation = {}

    def generate_posts(self):
        blogs = self.env.list_templates()
        for name in blogs:
            title = name.replace("-", " ")
            self.navigation[name] = title
        print(self.navigation)
        for name in blogs:
            blog = self.env.get_template(name)
            newfile = open("site/"+name, "w")
            newfile.write(blog.render(navigation=blogs))
            newfile.close()
        return self.navigation



poster = generate_site("posts", MyLoader)
poster.generate_posts()
