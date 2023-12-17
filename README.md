## Blog

New things I read about.

#### Workflow
Add md file to posts_md and commit. Pre-commit hook should
convert md to html.

For new machines -
Add `pre-commit` to `.git/hooks/` with contents -
```
#!/bin/bash

./githook.js
git add -u
```
