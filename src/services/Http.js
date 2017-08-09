import axios from 'axios'

import {CachedBlockId} from '@services/CachedStorages'
import {CachedCsrf} from '@services/CachedCookies'

let loadingDelayHanlder

let startLoading = function(showLoading) {
  if (showLoading) {
    loadingDelayHanlder = setTimeout(_ => {
      // start loading
    }, 500)
  }
}

let stopLoading = function(showLoading) {
  if (showLoading) {
    clearTimeout(loadingDelayHanlder);
    // stop loading
  }
}

function httpBase(method, url, data = {}, options = {}) {
  function innerHttpBase({
    showLoading = true,
    showErrorToast = true,
    throwError = false
  }) {
    let httpOptions = {
      method,
      url: process.env.httpBaseUrl + url,
      headers: {
        'x-zhsq-source': 'wechat',
        'x-zhsq-room-id': ''
      },
      withCredentials: true
    }

    if (method === 'post') {
      httpOptions.data = data
      httpOptions.headers['X-CSRFToken'] = CachedCsrf.get()
    }

    return new Promise((resolve, reject) => {
      startLoading(showLoading)

      axios(httpOptions).then(response => {
        stopLoading(showLoading)
        let data = response.data
        if (data) {
          switch (data.code) {
            case 'OK':
              resolve(data.data)
              break

            case 'USER_NOT_LOGGED_IN':
            case 'CSRF_FAILED':
              window.router.push('/test')
              break

            default:
              if (throwError) {
                reject(data.msg)
              }

              if (showErrorToast) {
                // show toast
              }
          }
        }
      }, error => {
        stopLoading(showLoading)
        let status = parseInt(error.status / 100, 10)
        let errorMsg = ''
        switch (status) {
          case 5:
            errorMsg = '服务器内部错误'
            break
          case 4:
            errorMsg = 'URL找不到'
            break
          case 0:
            errorMsg = '连接服务器超时'
            break
          default:
            errorMsg = '未知错误'
        }
        if (throwError) {
          reject(errorMsg)
        }
      })
    })
  }

  return innerHttpBase(options)
}

export let get = function(url, options) {
  return httpBase('get', url)
}

export let post = function(url, data) {
  return httpBase('post', url, data)
}
