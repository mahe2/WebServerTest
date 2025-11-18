# React Native 入门教程（完整版）

## 🎯 适合人群

✅ 有Android开发经验  
✅ 会Kotlin/Java  
✅ 会TypeScript  
✅ 想快速上手React Native

**预计学习时间：7-14天**

---

## 📚 目录

1. [环境配置](#第1章-环境配置)
2. [React基础](#第2章-react基础必学)
3. [React Native核心组件](#第3章-react-native核心组件)
4. [样式和布局](#第4章-样式和布局)
5. [导航](#第5章-导航)
6. [状态管理](#第6章-状态管理)
7. [网络请求](#第7章-网络请求)
8. [实战项目](#第8章-实战项目)

---

## 第1章：环境配置

### 1.1 安装Node.js

```bash
# 检查是否已安装（你的WebServerTest项目已经有了）
node --version
npm --version

# 如果版本低于16，建议升级
brew upgrade node
```

### 1.2 安装React Native CLI

```bash
# 全局安装
npm install -g react-native-cli

# 或使用npx（推荐，不需要全局安装）
npx react-native --version
```

### 1.3 Android环境（你应该已经有了）

```bash
# 检查Android SDK
echo $ANDROID_HOME
# 应该输出：/Users/你的用户名/Library/Android/sdk

# 如果没有，在 ~/.zshrc 中添加：
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 1.4 创建第一个项目

```bash
# 创建TypeScript模板项目
npx react-native init MyFirstApp --template react-native-template-typescript

# 进入项目
cd MyFirstApp

# 用VSCode打开
code .
```

### 1.5 VSCode插件安装

在VSCode中安装以下插件：

```
✅ React Native Tools（必装）
✅ ES7+ React/Redux/React-Native snippets
✅ Prettier - Code formatter
✅ ESLint
✅ Auto Rename Tag
✅ Bracket Pair Colorizer
```

### 1.6 运行项目

```bash
# 启动Metro（打包服务器）
npm start

# 新开一个终端，运行Android
npm run android

# 或运行iOS（需要Mac + Xcode）
npm run ios
```

**首次运行需要5-10分钟编译，耐心等待！**

---

## 第2章：React基础（必学）

### 2.1 组件概念（类比Android）

**Android对比：**
```kotlin
// Android - Activity/Fragment
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

**React Native：**
```typescript
// React Native - 函数组件
import React from 'react';
import { View, Text } from 'react-native';

const MainActivity = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default MainActivity;
```

### 2.2 JSX语法（类似XML但更灵活）

```typescript
// JSX - 看起来像HTML/XML
const MyComponent = () => {
  const name = "张三";
  const age = 25;
  
  return (
    <View>
      {/* 这是注释 */}
      <Text>姓名：{name}</Text>
      <Text>年龄：{age}</Text>
      
      {/* 条件渲染 */}
      {age >= 18 && <Text>已成年</Text>}
      
      {/* 三元运算符 */}
      <Text>{age >= 18 ? '成年人' : '未成年'}</Text>
    </View>
  );
};
```

### 2.3 Props（属性传递）

**Android对比：**
```kotlin
// Android - Intent传参
val intent = Intent(this, DetailActivity::class.java)
intent.putExtra("name", "张三")
intent.putExtra("age", 25)
startActivity(intent)
```

**React Native：**
```typescript
// 定义接收Props的组件
interface UserCardProps {
  name: string;
  age: number;
}

const UserCard: React.FC<UserCardProps> = ({ name, age }) => {
  return (
    <View>
      <Text>姓名：{name}</Text>
      <Text>年龄：{age}</Text>
    </View>
  );
};

// 使用组件
const App = () => {
  return (
    <View>
      <UserCard name="张三" age={25} />
      <UserCard name="李四" age={30} />
    </View>
  );
};
```

### 2.4 State（状态管理）

**Android对比：**
```kotlin
// Android - 成员变量
class MainActivity : AppCompatActivity() {
    private var count = 0  // 状态
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        button.setOnClickListener {
            count++  // 修改状态
            textView.text = "Count: $count"  // 更新UI
        }
    }
}
```

**React Native：**
```typescript
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  // useState Hook - 声明状态
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button 
        title="增加" 
        onPress={() => setCount(count + 1)}  // 修改状态
      />
      <Button 
        title="减少" 
        onPress={() => setCount(count - 1)} 
      />
      <Button 
        title="重置" 
        onPress={() => setCount(0)} 
      />
    </View>
  );
};
```

### 2.5 useEffect（生命周期）

**Android对比：**
```kotlin
// Android - 生命周期
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // 初始化
    }
    
    override fun onResume() {
        // 恢复时执行
    }
    
    override fun onDestroy() {
        // 销毁时清理
    }
}
```

**React Native：**
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  
  // 相当于 onCreate + onResume
  useEffect(() => {
    console.log('组件挂载了');
    
    // 启动定时器
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // 相当于 onDestroy - 清理资源
    return () => {
      console.log('组件卸载了');
      clearInterval(timer);
    };
  }, []); // 空数组表示只在挂载时执行一次
  
  return (
    <View>
      <Text>运行了 {seconds} 秒</Text>
    </View>
  );
};
```

### 2.6 事件处理

```typescript
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    console.log('提交:', { name, email });
    // 调用API等
  };
  
  return (
    <View>
      <TextInput
        placeholder="姓名"
        value={name}
        onChangeText={setName}  // 监听输入变化
      />
      <TextInput
        placeholder="邮箱"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="提交" onPress={handleSubmit} />
    </View>
  );
};
```

---

## 第3章：React Native核心组件

### 3.1 View（容器）

**Android对比：** 类似 `LinearLayout`, `FrameLayout`

```typescript
import { View } from 'react-native';

const MyView = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* 子组件 */}
    </View>
  );
};
```

### 3.2 Text（文本）

**Android对比：** 类似 `TextView`

```typescript
import { Text } from 'react-native';

const MyText = () => {
  return (
    <View>
      <Text style={{ fontSize: 20, color: 'blue' }}>
        普通文本
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        粗体文本
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail">
        这是一段很长的文本，超过两行会显示省略号...
      </Text>
    </View>
  );
};
```

### 3.3 Image（图片）

**Android对比：** 类似 `ImageView`

```typescript
import { Image } from 'react-native';

const MyImage = () => {
  return (
    <View>
      {/* 本地图片 */}
      <Image
        source={require('./assets/logo.png')}
        style={{ width: 100, height: 100 }}
      />
      
      {/* 网络图片 */}
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={{ width: 200, height: 200 }}
        resizeMode="cover"  // cover, contain, stretch
      />
    </View>
  );
};
```

### 3.4 TouchableOpacity（可点击）

**Android对比：** 类似添加 `setOnClickListener`

```typescript
import { TouchableOpacity, Text } from 'react-native';

const Button = () => {
  const handlePress = () => {
    console.log('按钮被点击');
  };
  
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}  // 点击时透明度
      style={{
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: 'white', textAlign: 'center' }}>
        点击我
      </Text>
    </TouchableOpacity>
  );
};
```

### 3.5 TextInput（输入框）

**Android对比：** 类似 `EditText`

```typescript
import { TextInput } from 'react-native';

const Input = () => {
  const [text, setText] = useState('');
  
  return (
    <TextInput
      placeholder="请输入..."
      value={text}
      onChangeText={setText}
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
      }}
      // 其他属性
      secureTextEntry={false}  // true为密码输入
      keyboardType="default"   // default, numeric, email-address
      multiline={false}        // 多行
      maxLength={100}
    />
  );
};
```

### 3.6 ScrollView（滚动视图）

**Android对比：** 类似 `ScrollView`

```typescript
import { ScrollView, Text } from 'react-native';

const MyScroll = () => {
  return (
    <ScrollView>
      {[...Array(50)].map((_, i) => (
        <Text key={i} style={{ padding: 20 }}>
          Item {i + 1}
        </Text>
      ))}
    </ScrollView>
  );
};
```

### 3.7 FlatList（高性能列表）

**Android对比：** 类似 `RecyclerView`

```typescript
import { FlatList, Text, View } from 'react-native';

interface Item {
  id: string;
  title: string;
}

const MyList = () => {
  const data: Item[] = [
    { id: '1', title: '项目1' },
    { id: '2', title: '项目2' },
    { id: '3', title: '项目3' },
  ];
  
  const renderItem = ({ item }: { item: Item }) => (
    <View style={{ padding: 20, borderBottomWidth: 1 }}>
      <Text>{item.title}</Text>
    </View>
  );
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      // 性能优化
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};
```

### 3.8 Modal（弹窗）

**Android对比：** 类似 `Dialog`

```typescript
import { Modal, View, Text, Button } from 'react-native';

const MyModal = () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <View>
      <Button title="打开弹窗" onPress={() => setVisible(true)} />
      
      <Modal
        visible={visible}
        animationType="slide"  // slide, fade, none
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
            <Text>这是一个弹窗</Text>
            <Button 
              title="关闭" 
              onPress={() => setVisible(false)} 
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
```

---

## 第4章：样式和布局

### 4.1 StyleSheet

```typescript
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};
```

### 4.2 Flexbox布局

**Android对比：** 类似 `LinearLayout` + `weight`

```typescript
const FlexDemo = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* 水平排列 - 类似 LinearLayout horizontal */}
      <View style={{ 
        flexDirection: 'row',  // row 或 column
        justifyContent: 'space-between',  // 主轴对齐
        alignItems: 'center',  // 交叉轴对齐
      }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
      </View>
      
      {/* flex权重 - 类似 layout_weight */}
      <View style={{ flex: 1, backgroundColor: 'yellow' }} />
      <View style={{ flex: 2, backgroundColor: 'pink' }} />
    </View>
  );
};
```

### 4.3 常用样式属性

```typescript
const StylesDemo = () => {
  return (
    <View style={{
      // 尺寸
      width: 100,
      height: 100,
      
      // 边距
      margin: 10,
      marginTop: 20,
      padding: 15,
      
      // 背景
      backgroundColor: '#fff',
      
      // 边框
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      
      // 阴影（iOS）
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      
      // 阴影（Android）
      elevation: 5,
    }}>
      <Text>样式示例</Text>
    </View>
  );
};
```

---

## 第5章：导航

### 5.1 安装React Navigation

```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

# iOS需要pod install
cd ios && pod install && cd ..
```

### 5.2 基础导航

```typescript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

// 定义路由参数类型
type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// 首页
const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>首页</Text>
      <Button
        title="去详情页"
        onPress={() => navigation.navigate('Details', {
          itemId: 42,
          title: '详情标题'
        })}
      />
    </View>
  );
};

// 详情页
const DetailsScreen = ({ route, navigation }: any) => {
  const { itemId, title } = route.params;
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>详情页</Text>
      <Text>ID: {itemId}</Text>
      <Text>标题: {title}</Text>
      <Button
        title="返回"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// 主应用
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: '首页' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{ title: '详情' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

### 5.3 底部导航

```bash
npm install @react-navigation/bottom-tabs
```

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
```

---

## 第6章：状态管理

### 6.1 Context API（轻量级）

```typescript
import React, { createContext, useContext, useState } from 'react';

// 创建Context
interface UserContextType {
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider组件
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  const login = (name: string, email: string) => {
    setUser({ name, email });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 自定义Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// 使用
const App = () => {
  return (
    <UserProvider>
      <HomeScreen />
    </UserProvider>
  );
};

const HomeScreen = () => {
  const { user, login, logout } = useUser();
  
  return (
    <View>
      {user ? (
        <>
          <Text>欢迎, {user.name}</Text>
          <Button title="退出" onPress={logout} />
        </>
      ) : (
        <Button 
          title="登录" 
          onPress={() => login('张三', 'zhang@example.com')} 
        />
      )}
    </View>
  );
};
```

---

## 第7章：网络请求

### 7.1 使用Fetch

```typescript
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error('网络请求失败');
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 10)); // 只取前10条
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Text>加载中...</Text>;
  }
  
  if (error) {
    return <Text>错误: {error}</Text>;
  }
  
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
};
```

### 7.2 POST请求

```typescript
const createPost = async (title: string, body: string) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
    });
    
    const data = await response.json();
    console.log('创建成功:', data);
  } catch (error) {
    console.error('创建失败:', error);
  }
};
```

---

## 第8章：实战项目 - Todo List

### 完整代码示例

```typescript
// App.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  
  // 添加待办
  const addTodo = () => {
    if (inputText.trim() === '') {
      Alert.alert('提示', '请输入待办事项');
      return;
    }
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputText,
      completed: false,
    };
    
    setTodos([newTodo, ...todos]);
    setInputText('');
  };
  
  // 切换完成状态
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // 删除待办
  const deleteTodo = (id: string) => {
    Alert.alert(
      '确认删除',
      '确定要删除这个待办吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => setTodos(todos.filter(todo => todo.id !== id)),
        },
      ]
    );
  };
  
  // 渲染单个待办项
  const renderTodo = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => toggleTodo(item.id)}
      onLongPress={() => deleteTodo(item.id)}
    >
      <View style={styles.todoContent}>
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxChecked,
        ]} />
        <Text style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted,
        ]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 标题 */}
      <View style={styles.header}>
        <Text style={styles.title}>我的待办事项</Text>
        <Text style={styles.subtitle}>
          共 {todos.length} 项，已完成 {todos.filter(t => t.completed).length} 项
        </Text>
      </View>
      
      {/* 输入框 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="添加新的待办..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* 待办列表 */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无待办事项</Text>
            <Text style={styles.emptyHint}>点击上方添加按钮创建</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '300',
  },
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  emptyHint: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
});

export default App;
```

---

## 📚 学习资源

### 官方文档
- React Native官网：https://reactnative.dev/
- React官网：https://react.dev/

### 中文教程
- React Native中文网：https://reactnative.cn/
- 掘金React Native专栏
- B站搜索"React Native教程"

### 组件库
- React Native Elements：https://reactnativeelements.com/
- NativeBase：https://nativebase.io/
- React Native Paper：https://callstack.github.io/react-native-paper/

### 工具
- Expo：https://expo.dev/ (快速开发工具)
- React Native Debugger
- Flipper：Facebook官方调试工具

---

## 🎯 学习路线

### Week 1：基础
- Day 1-2：环境配置，React基础
- Day 3-4：核心组件，样式布局
- Day 5-7：导航，状态管理

### Week 2：进阶
- Day 1-2：网络请求，数据处理
- Day 3-5：实战项目（Todo List）
- Day 6-7：优化、调试

### Week 3+：深入
- 性能优化
- 原生模块集成
- 动画
- 发布上线

---

## 💡 学习建议

1. **多敲代码**
   - 每个例子都要自己敲一遍
   - 不要只看不写

2. **对比Android**
   - 利用你的Android经验
   - 找对应的概念

3. **做小项目**
   - Todo List
   - 天气应用
   - 新闻阅读器

4. **查文档**
   - 遇到问题先看官方文档
   - Stack Overflow搜索

5. **加入社区**
   - React Native中文社区
   - GitHub找项目学习

---

## 🚀 下一步

学完基础后，可以尝试：

1. **集成第三方库**
   - react-native-vector-icons (图标)
   - react-native-camera (相机)
   - react-native-maps (地图)

2. **学习高级特性**
   - Redux (复杂状态管理)
   - TypeScript进阶
   - 自定义原生模块

3. **实战项目**
   - 仿微信界面
   - 电商App
   - 社交App

---

## 📞 需要帮助？

遇到问题随时问我：
- 代码报错
- 概念不理解
- 项目搭建
- 最佳实践

**祝你学习顺利！有TypeScript基础，React Native对你来说不难！** 💪
