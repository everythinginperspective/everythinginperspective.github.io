export const checksums = {
  "articles": "v3.5.0--0RlUPJnEtlRxfer4JkVaizxT3klibFhjR7c_KuiXEkc",
  "perspectives": "v3.5.0--Ga0LZ6jP_x7tVSJNdxs12T51N4M3YAnbEIoSgn_JWjE",
  "pages": "v3.5.0--gHRo8EtQ2kW4kndcKh9Xq31jpqQMRl0VVuHw10VgwsU",
  "books": "v3.5.0--McJY6dSkrRLSKXme3ja4k9YFQTTvGE4Y7zDCCqrv5uw",
  "people": "v3.5.0--sOY593PccxVxhCWXz83cQttbQiWs4WB57wrIQh7KoMM",
  "languages": "v3.5.0--Yg-4QY6ScsTUIV9gdVpNoQQFBS1eQvCow06GobKozVM"
}
export const checksumsStructure = {
  "articles": "4yuYbf0Zmb6hhSCJn1VYsLRosU8HmHCmTHrpRY9HVp0",
  "perspectives": "XNOX1T-xOsWGP8s9LEx2Byyln9iGKlCpWplKXdgcQ8w",
  "pages": "4SVpQajRpJ_x5iAGVCMwxUI-MmgDEKQB-8IgswBI2kc",
  "books": "McJY6dSkrRLSKXme3ja4k9YFQTTvGE4Y7zDCCqrv5uw",
  "people": "C_SjrwvyMMOvgLsj2J41O3A2WiVGF_DB0qg0cXh35mc",
  "languages": "cjyFds2bJRYi4wwLjc_-hVyzFxRU7kBbdEktGzhSfSA"
}

export const tables = {
  "articles": "_content_articles",
  "perspectives": "_content_perspectives",
  "pages": "_content_pages",
  "books": "_content_books",
  "people": "_content_people",
  "languages": "_content_languages",
  "info": "_content_info"
}

export default {
  "articles": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "author": "string",
      "authorBio": "string",
      "body": "json",
      "category": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "image": "string",
      "imageAlt": "string",
      "keywords": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "perspectives": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "author": "string",
      "authorBio": "string",
      "body": "json",
      "category": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "image": "string",
      "imageAlt": "string",
      "keywords": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "pages": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "books": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "author": "string",
      "authorBio": "string",
      "body": "json",
      "category": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "image": "string",
      "imageAlt": "string",
      "keywords": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "people": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "description": "string",
      "extension": "string",
      "image": "string",
      "meta": "json",
      "name": "string",
      "navigation": "json",
      "path": "string",
      "role": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "languages": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}