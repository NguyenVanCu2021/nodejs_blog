khai bao: prettier. Trong mục script thêm 
 "beautiful": "prettier --single-quote --trailing-comma all --tab-width 4 --write \"src/**/*.{js,json,scss}\"",

 "lint-staged": {
    "src/**/*.{js,json,scss}": "prettier --single-quote --trailing-comma all --tab-width 4 --write"
  },
  "husky": {
    "hook": {
      "pre-commit": "npm run pre-commit"
    }
  },