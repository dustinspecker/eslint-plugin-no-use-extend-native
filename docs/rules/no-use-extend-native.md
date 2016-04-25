# Prevent using extended native objects

## Fail

```js
'unicorn'.green;
[].customFunction();
```

## Pass

```js
'unicorn'.length;
[].push(3);
```
