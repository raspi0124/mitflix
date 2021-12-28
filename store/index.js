export const state = () => ({
  videoPlaying: []
});

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
export const mutations = {
  setVideoPlaying(state, { videoid, currentTime }) {
    const index = findWithAttr(state.videoPlaying, "videoid", videoid);
    console.log(index);
    if (index !== -1) {
      state.videoPlaying[index]["currentTime"] = currentTime;
    } else {
      state.videoPlaying.push({ videoid: videoid, currentTime: currentTime });
    }
  }
};
//setSelectedDay(state, selectedDay) の第1引数で状態（state）を取得します。
//第2引数でselectedDayの値をstate（情報源）に渡します。ここでは例えばselectedDayを４月とします。
//すると、setSelectedDay(state, selectedDay) {}の中身では
//selectedDayがnullだったものを４月とデータを更新していることになります（state.selectedDay = selectedDayがそれ）。

export const actions = {
  setVideoPlaying({ commit }, { videoid, currentTime }) {
    commit("setVideoPlaying", { videoid, currentTime });
  }
  //setSelectedDay({ commit }, selectedDay)の第1引数でmutationsとcommitします。
  //Actions は、状態は変更せず、 Mutations を commitし、Mutations を commit することで状態(State)を更新します。：引用（参考記事/[Vue.js] Vuexの使い方を知る）
  //commit('setSelectedDay', selectedDay)では、第１引数に呼び出す関数の名前を入れてます。
  //第２引数では該当mutationsで使用する値（selectedDay）をいれています。
};
