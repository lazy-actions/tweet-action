# Tweet Action

## Feature

- Tweet message to Twitter
- User defined custom message
  - Render using [EJS](https://ejs.co/)

## Inputs

|Key|Required|Type|Description|
|:--:|:--:|:--:|:--|
|message|false|string|Plain message to tweet<br>:warning:Cannot be used with `data`, `data-filename`, `template` and `template-filename`|
|data|false|string (JSON)|Parameters to render in template<br>Be sure to specify either `data` or `data-filename`<br>:warning:Cannot be used with `data-filename`|
|data-filename|false|string|Filename where data is saved|
|template|false|string|Template string based on EJS<br>Please refer to [EJS Homepage](https://ejs.co/) for how to write<br>Be sure to specify either `template` or `template-filename`<br>:warning:Cannot be used with `template-filename`|
|template-filename|false|string|Filename where template is written|
|twitter-token|true|string|OAuth 2.0 Bearer Token<br>See [Twitter Docs](https://developer.twitter.com/en/docs/authentication/oauth-2-0) for details|

## Example

### Basic usage

```yaml
steps:
  - uses: lazy-actions/tweet-action@main
    with:
      message: Hello World
      twitter-token: ${{ secrets.TWITTER_TOKEN }}
```

### Use template

```yaml
steps:
  - uses: lazy-actions/tweet-action@main
    with:
      data: |
        {
          "name": "lazy-actions"
        }
      template: Hello <%- name %>
      twitter-token: ${{ secrets.TWITTER_TOKEN }}
```

### Load template and data from file

```yaml
steps:
  - uses: lazy-actions/tweet-action@main
    with:
      data-filename: tests/fixtures/data.json
      template-filename: tests/fixtures/template.ejs
      twitter-token: ${{ secrets.TWITTER_TOKEN }}
```
