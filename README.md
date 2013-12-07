# Kudos Server

This server will store the kudos you get using the [svbtle-jekyll](https://github.com/orlando/svbtle-jekyll) theme.

## Deploying to Heroku

```
$ heroku create
$ heroku addons:add mongolab
$ git push heroku master
$ heroku open
```

then just copy the heroku url using the `/kudos` path (ex. http://kudos-server-example.herokuapp.com/kudos) to your `svbtle.yml` in your [svbtle-jekyll](https://github.com/orlando/svbtle-jekyll) blog and you are ready to go.

## Contributing

Just create a pull request.

## Copyright

Copyright (c) 2013 Orlando Del Aguila. See LICENSE.txt for further details.
