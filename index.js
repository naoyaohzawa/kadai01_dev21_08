
// 何問目か表示
const stageYearTitle = [
    "運用1年目",
    "運用2年目",
    "運用3年目",
    "運用4年目",
    "運用5年目",
];

const stageNum = stageYearTitle.length;

// クイズの配列
const question = [
    "今100万円貰うのと、一年後100万円貰うのどちらがお得？",
    "現在、銀行の普通預金口座の預金金利は約何%でしょう？",
    "複利2%で運用したら約何年で元金は2倍になるでしょう？",
    "日経平均の配当利回りはおおよそどれくらいでしょう？",
    "IRRとは何のことでしょうか？"
];

// クイズの問
const toi =[
    ["今", "1年後", "変わらない"],
    ["0.2%", "0.02%", "0.002%"],
    ["24年", "36年", "48年"],
    ["1~2%", "5~6%", "8~11%"],
    ["Investment of Risk Return", "Internal Rate of Return", "Interest Return of Reputation"]
];

// クイズの答え
const ans = [1, 3, 2, 1, 2];


// 初期投資額
var r = 1000;

// 投資結果
const yourPercent = [];

// var r1st = yourPercent[0]*r;
// var r2nd = r1st * yourPercent[1];
// var r3rd = r2nd * yourPercent[2];
// var r4th = r3rd * yourPercent[3];
// var r5th = r4th * yourPercent[4];

// const yourInvestmentHistory = [r1st, r2nd, r3rd, r4th, r5th];

// 収益率をランダムで出すの数式

    // 1. 正解した場合5%上乗せ
// var percent1 = Math.round(Math.random()*10 +5)
// var r1 = (percent1/100) * r +r;

//     // ２.失敗した場合
// var percent1 = Math.round(Math.random()*10)
// if(Math.random()>0.7){
//     var r1 = (percent1/100) * r +r;
// } else {
//     var r1 = (percent1/100 * -1) * r +r;
//     var percent1 = -1 * percent1;
// }
// console.log(percent1);
// console.log(r1)


// 初期投資額設定に進む
$("#goRule").on("click",function(){
    $("#main-container").html("");
    $("#stage").fadeIn(0);
});


  // 問題文と回答選択肢を表示する
let i =0;
function q(a){
    $("#displayStage").html(stageYearTitle[a]);
    $("#quest").html(question[a]);
    $("#toi1").html(toi[a][0]);
    $("#toi2").html(toi[a][1]);
    $("#toi3").html(toi[a][2]);
};
q(i);

// 問題に回答する
$('[name=toi').on("click", function () {
    if($(this).val() == ans[i]){
        
        // 正解なら
        $("#resultMessage").html("正解!!")
        $("#resultMessage").css({'color':'red', 'fontWeight': 'bold'});
        
        $("#btn").fadeIn();

        $("#btn").one("click",function(){

            // 運用率をrandom*30倍で出力
            percent1 = Math.round(Math.random()*30)
            $("#yourPercent").html(`今年の運用率は${percent1}%です`);
            // var r1 = (percent1/100) * r +r;

            // 投資率は空の配列に追加
            yourPercent.push(percent1);
            // yourInvestmentHistory.push(r1);
            // $("#yourInvestment").html(`あなたの投資金は${r1}になりました`);
            $("#btn").fadeOut();
            $("#btnNext").fadeIn();
            
        
            // console.log(yourPercent);
            // console.log(yourInvestmentHistory);
        });    
        // 不正解なら
    }else {
        $("#resultMessage").html("残念!!")
        $("#resultMessage").css({'color':'blue', 'fontWeight': 'bold'});
        $("#btn").fadeIn();

        $("#btn").one("click",function(){
            var percent1 = Math.round(Math.random()*20)
            if(Math.random()>0.7){
            var r1 = (percent1/100) * r + r;
            } else {
            var r1 = (percent1/100 * -1) * r + r;
            var percent1 = -1 * percent1;
            }
    
            // percent1 = Math.round(Math.random()*10 +5)
            $("#yourPercent").html(`今年の収益率は${percent1}%です`);
            // var r1 = (percent1/100) * r + r;
            yourPercent.push(percent1);
            // yourInvestmentHistory.push(r1);
    
            // console.log(yourPercent);
            // console.log(yourInvestmentHistory);
            
            // $("#yourInvestment").html(`あなたの投資金は${r1}になりました`);
            $("#btn").fadeOut();
            $("#btnNext").fadeIn();  
            
        })        
    };
});

// 次の問題に進むボタン
  $("#btnNext").on("click",function () {
      $("#yourPercent").html("");
      $("#yourInvestment").html("");
      $("#btnNext").fadeOut();
      $("#resultMessage").html("");
      if(i+1<stageNum){
        i++
        q(i);
      } else{
        //   問題が全て終わった後の処理
          $("#stage").fadeOut();
          $("#resultPage").fadeIn();

        // 毎年の利率を表示する
        var str ="";
          for(var p=0; p<5; p++){
            str += `${p+1}年目は${yourPercent[p]}%<br>`;
          };
        $("#returnPercent").html(str);  

        //   投資結果を計算する 運用利率%を100で割り、1を足す。そこに期初の投資額をかける
        var yourInvestmentResult = Math.floor(((((((r * (yourPercent[0]/100 +1)) * (yourPercent[1]/100 +1)) * (yourPercent[2]/100 +1)) * (yourPercent[3]/100 +1)) * (yourPercent[4]/100 +1))));
        // IRR計算（期中配当無し、複利運用。5年後に売却して投資額回収ベース。5年間の運用の現在価値をIRRにする）
        var irr = Math.floor((Math.pow((yourInvestmentResult/(r)), 1/5) -1)*100);
        $("#finalResult").html(`あなたの運用結果は${yourInvestmentResult}万円です！IRRは${irr}%です！`);

        

        //   いくら儲けたか計算
        var profit = (yourInvestmentResult - r);
        
        if(profit > 0){
            $("#profit").html(`投資成功です！`)
            // $("#maezawa").fadeIn();
        } else {
            $("#profit").html("投資失敗です。。")
            // $("#kasuga").fadeIn();
        }
      };

      var r1st = (yourPercent[0]/100 *r) +r;
      var r2nd = (r1st * yourPercent[1]/100) +r1st;
      var r3rd = (r2nd * yourPercent[2]/100) +r2nd;
      var r4th = (r3rd * yourPercent[3]/100) +r3rd;
      var r5th = (r4th * yourPercent[4]/100) +r4th;
      
      const yourInvestmentHistory = [r1st, r2nd, r3rd, r4th, r5th];

    //   グラフスタート

    var ctx = $("#resultChart").get(0).getContext("2d");

var data = {
    labels: ["1年目", "2年目", "3年目", "4年目", "5年目"],
    datasets: [{
        label: '金額推移',
        data: yourInvestmentHistory,
        borderColor: 'rgba(255, 100, 100, 1)',
        lineTension:0
    }]
};

var options = {};

var resultChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
    
});



    // グラフエンド



    });

    // 最初の画面に戻る
    $("#restart").click(function(){
        location.reload();
    });



