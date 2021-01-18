export default function jieliu(handle, wait) {
  let lock = true;
  return (...args) => {
    if (lock) {
      lock = false;
      handle.apply(this, args);
    } else {
      return;
    }
    setTimeout(() => {
      lock = true;
    }, wait);
  }
}