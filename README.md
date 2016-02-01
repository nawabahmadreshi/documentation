Documentation
=======

Live at: https://dev.branch.io

### Install Bundler
```
gem install bundler
```
### Install Xcode CLI Tools
```
xcode-select --install
```
### Install Nokogiri
```
sudo gem install nokogiri -v '1.6.6.2'
```

### Init submodule

**DO THIS ONCE**, when you first clone the repo.

```
git submodule init
```

### Update Submodule
```
git submodule update
```

### Install Jekyll and Dependencies
```
npm install && bundle install
```

### Increase Open file Limit
```
ulimit -n 10000
```

### Open another terminal console and start jekyll
```
sudo bundle exec jekyll serve --watch
```

Testing for broken links, etc.
=======

Make sure you have htmlproof installed -- if not you should run `bundle`

`htmlproof --href-ignore /^$/ ./_site/`


Updating the submodule reference guides on dev portal
=======

`git submodule foreach git pull origin master`


Future todos
=======

- React -> binding components to docs so we can show progress / encourage users
- Handle case where user moves to recipe that doesn't support platform (what happens if a given recipe is iOS/Android only and user was previously on web?). being sure to return to previously platform when clicking out of recipe without that previous platform. (Ask Derrick if unclear)


Overview for the team
=======

The new documentation will have 4 parts:

1. Overview
1. Recipes
1. Domains
1. Reference Docs

Right now we are primarily focused on 2. Recipes and 3. Domains, as well as the components from which they are both composed, aka Ingredients.

`Recipes`: The fastest way for developers to implement Branch. Provides the bare minimum number of steps to integration, as well as `tips` pointing developers toward all the configuration options we offer. Composed of `ingredients`.

`Ingredients`: The pieces. A short, self-contained explanation and/or code sample.

---

