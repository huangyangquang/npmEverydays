# i (全称：inflect)

### 安装：
```
npm install i
```

### 使用：
在使用之前，先导入包 i:
```
var inflect = require('i')();
```

当启动时传递 true:
```
var inflect = require('i')(true);
```

以下所有 api 函数都可以直接在字符串上调用:
```
inflect.titleize('messages to store') // === 'Messages To Store'

'messages to store'.titleize // === 'Messages To Store'
```



### Pluralize: 以复数表示
```
inflect.pluralize('person'); // === 'people'
inflect.pluralize('octopus'); // === 'octopi'
inflect.pluralize('Hat'); // === 'Hats'
```

### Singularize: 以单数表示
```
inflect.singularize('people'); // === 'person'
inflect.singularize('octopi'); // === 'octopus'
inflect.singularize('Hats'); // === 'Hat'
```

### Camelize: 已驼峰命名规则表示
- 第一个参数：字符串
- 第二个参数：是否已大驼峰命名规则展示
```
inflect.camelize('message_properties'); // === 'MessageProperties'
inflect.camelize('message_properties', false); // === 'messageProperties'
```

>小驼峰命名规则：第一个单词小写，其他单词首字母大写  
写法如：myFirstName  
>大驼峰命名规则：第一个单词首字母大写，其他单词首字母也大写  
写法如：MyFirstName


### underscore: 以下划线表示
```
inflect.underscore('MessageProperties'); // === 'message_properties'
inflect.underscore('messageProperties'); // === 'message_properties'
```

### Humanize: 人性化（不好翻译）
理解：就是使得表示的形式更加符合常人、普通人的理解
```
inflect.humanize('message_id'); // === 'Message'
```

### Dasherize: 冲刺（不好翻译）
```
inflect.dasherize('message_properties'); // === 'message-properties'
inflect.dasherize('Message Properties'); // === 'Message Properties'

```

### Titleize: 以标题的形式表示
```
inflect.titleize('message_properties'); // === 'Message Properties'
inflect.titleize('message properties to keep'); // === 'Message Properties to Keep'
```

### Demodulize: 解调
获取到字符串'Message.Bus.Properties'中，最后一个被访问的属性
```
inflect.demodulize('Message.Bus.Properties'); // === 'Properties'

```

### Tableize: 以表格的形式表示
```
inflect.tableize('MessageBusProperty'); // === 'message_bus_properties'

```

### Classify: 归类
```
inflect.classify('message_bus_properties'); // === 'MessageBusProperty'
```

### Foreign key: 以外键的形式表示
```
inflect.foreign_key('MessageBusProperty'); // === 'message_bus_property_id'
inflect.foreign_key('MessageBusProperty', false); // === 'message_bus_propertyid'
```

### Ordinalize: 以顺序的形式表示
```
inflect.ordinalize( '1' ); // === '1st'
```

## 自定义变化规则

### Custom plural: 自定义复数 
我们可以在任何这些自定义规则中使用正则表达式:
```
inflect.inflections.plural('person', 'guys');
inflect.pluralize('person'); // === 'guys'
inflect.singularize('guys'); // === 'guy'
```

### Custom singular: 自定义单数
```
inflect.inflections.irregular('person', 'guys')
inflect.pluralize('person'); // === 'guys'
inflect.singularize('guys'); // === 'person'
```

### Custom human: 自定义人性化
理解：就是使得表示的形式更加符合常人、普通人的理解
```
inflect.inflections.human(/^(.*)_cnt$/i, '$1_count');
inflect.inflections.humanize('jargon_cnt'); // === 'Jargon count'
```

### Custom uncountable: 自定义不可数的单词
```
inflect.inflections.uncountable('oil')
inflect.pluralize('oil'); // === 'oil'
inflect.singularize('oil'); // === 'oil'
```
