from jinja2 import Environment, FileSystemLoader, TemplateNotFound, meta
from os.path import join, exists, getmtime
import json


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
        self.date_category = {}

    def generate_posts(self):
        href_title = self.env.list_templates()
        with open('config.json', 'r') as file:
            self.data = json.load(file)
        travel23_href = [[item["href"], item["date"]] for item in self.data["Travel23"]]
        travel24_href = [[item["href"], item["date"]] for item in self.data["Travel24"]]
        misc_href = [[item["href"], item["date"]] for item in self.data["Misc"]]
        print(travel24_href, travel23_href, misc_href)
        for name in href_title:
            blog = self.env.get_template(name)
            newfile = open("site/"+name, "w")
            newfile.write(blog.render(travel24_nav = travel24_href, travel23_nav=travel23_href, misc_nav = misc_href))
            newfile.close()


poster = generate_site("content", MyLoader)
poster.generate_posts()
