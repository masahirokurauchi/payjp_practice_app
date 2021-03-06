const pay = () => {
  // 公開鍵をセット
  Payjp.setPublicKey(process.env.PAYJP_PUBLIC_KEY);
  const form = document.getElementById("charge-form");

  // charge-form内のsubmitが実行されるとイベントが発火
  form.addEventListener("submit", (e) => {
    // Railsのフォーム送信処理をキャンセル。Railsのフォーム送信からサーバーサイドに値を送るのではなく、JavaScriptでサーバーサイドに値を送るため
    e.preventDefault();

    const formResult = document.getElementById("charge-form");
    const formData = new FormData(formResult);

    // 入力された、カードの情報を変数に代入
    const card = {
      number: formData.get("number"),
      cvc: formData.get("cvc"),
      exp_month: formData.get("exp_month"),
      exp_year: `20${formData.get("exp_year")}`,
    };

    Payjp.createToken(card, (status, response) => {
      if (status === 200) {
        const token = response.id;
        const renderDom = document.getElementById("charge-form");

        // トークンをパラメーターとして送るために、form内に隠し要素としてトークンの値が入っているHTMLを生成
        const tokenObj = `<input value=${token} type="hidden" name='token'>`;

        // formの最後に挿入
        renderDom.insertAdjacentHTML("beforeend", tokenObj);

        // 入力された各カード情報をパラメーターとして送られないように、値を削除。セキュリティ対策
        document.getElementById("number").removeAttribute("name");
        document.getElementById("cvc").removeAttribute("name");
        document.getElementById("exp_month").removeAttribute("name");
        document.getElementById("exp_year").removeAttribute("name");

        // フォームに記載されている情報を、サーバーサイドへ送信
        document.getElementById("charge-form").submit();
        document.getElementById("charge-form").reset();
      } else {
      }
    });
  });
};

window.addEventListener("load", pay);