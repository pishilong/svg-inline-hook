# svg-inline-hook
为了通过css来定义svg的样式，必须使用inline svg.
在客户端，我们使用webpack对资源进行打包，在处理svg时，可以使用raw-loader来达到获取inline svg的效果(png等图片还是使用url-loader).
在服务器端，使用这个包来hack node的require方法，在require时，直接返回raw svg.

项目使用了React, 所以下面的样例也举了React的例子.
## Installation
```bash
$ npm i --save svg-inline-hook
```

## Usage
在server端的入口文件中:
```javascript
require('asset-require-hook');
```
在import/require svg时：
ES 6 Import:
```javascript
import logoSvg from 'common/images/logo.svg';
```
require:
```javascript
const logoSvg = require('common/images/logo.svg');
```

## React Component
在React项目中，我们封装了一个组件:
```javascript
import React, { PropTypes } from 'react';

const Svg = (props) => {
  const { markup, className, ...rest } = props;
  const isBase64 = typeof markup === 'string' && markup.indexOf('data') === 0;

  if (isBase64) {
    return <img src={markup} className={className} {...rest} role="presentation" />
  }

  const content = require(`../../images/${markup}.svg`);

  return <span dangerouslySetInnerHTML={{ __html: content }} className={className} {...rest} />;
};

Svg.propTypes = {
  markup: PropTypes.string.isRequired,
};

export default Svg;

```
在其他地方使用的时候:
```javascript
import Svg from 'widgets/Svg';
...
<Svg markup="logo" className="logo" />
```


