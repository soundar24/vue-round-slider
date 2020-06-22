import pkg from '../package.json'
import bannerContent from './banner'

// a simple hack for the unpkg file. after the minify process the banner content will be removed
// so we can generate the unpkg file once again by simply adding the banner
export default {
  input: pkg.unpkg,
  output: {
    file: pkg.unpkg,
    banner: bannerContent
  }
}
