const output = document.getElementById('output');
const choices = document.getElementById('choices');
const startBtn = document.getElementById('start-btn');

let year = 2023;
let age = 22;
let workYear = 1;
let position = '初级开发工程师';
let level = 'P5';
let consecutiveGoodPerformance = 0; // 连续好绩效的次数

const families = ['普通家庭', '富裕家庭', '贫困家庭'];
const cities = ['北京', '上海', '深圳', '杭州'];
const companies = ['阿里', '腾讯', '字节跳动', '百度'];
const genders = ['男', '女'];
const levels = ['P5', 'P6', 'P7', 'P8', 'P9', 'P10']; // 职级体系

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateYearSummary() {
    const achievements = ['完成了项目A', '优化了系统B', '参与了新项目C'];
    const outcomes = ['出色地完成了任务', '背锅了', '获得了领导的认可', '同事的赞赏', '同事的妒忌'];

    const achievement = getRandom(achievements);
    const outcome = getRandom(outcomes);

    return `今年是${year}年，你${age}岁了，今年是你工作的第${workYear}年。<br>
            这一年你${achievement}，其中${outcome}。`;
}

function generateChoices() {
    const options = ['努力工作', '摸鱼', '跳槽'];
    choices.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => nextYear(option));
        choices.appendChild(button);
    });
}

function checkPromotion(outcome) {
    if (outcome === '出色地完成了任务' || outcome === '获得了领导的认可' || outcome === '同事的赞赏') {
        consecutiveGoodPerformance++;
        if (consecutiveGoodPerformance >= 2) { // 连续两次好绩效晋升一级
            const currentLevelIndex = levels.indexOf(level);
            if (currentLevelIndex < levels.length - 1) {
                level = levels[currentLevelIndex + 1];
                output.innerHTML += `<br><strong>恭喜你晋升到了${level}职级！</strong>`;
            } else if (currentLevelIndex === levels.length - 1) {
                output.innerHTML += `<br><strong>由于你太出色了，公司专门为你指定了${level}职级！</strong>`;
            }
            consecutiveGoodPerformance = 0; // 重置连续好绩效次数
        }
    } else {
        consecutiveGoodPerformance = 0; // 如果不是好绩效，重置连续好绩效次数
    }
}

function nextYear(choice) {
    year++;
    age++;
    workYear++;

    let summary = generateYearSummary();
    output.innerHTML = summary;

    const outcomes = ['出色地完成了任务', '背锅了', '获得了领导的认可', '同事的赞赏', '同事的妒忌'];
    const outcome = getRandom(outcomes);
    output.innerHTML += `<br>这一年你${outcome}。`;

    checkPromotion(outcome);

    generateChoices();
}

function startGame() {
    const family = getRandom(families);
    const city = getRandom(cities);
    const company = getRandom(companies);
    const gender = getRandom(genders);

    output.innerHTML = `你出生在一个${family}，生活在${city}。<br>
                        你抓阄的结果是：${gender}。<br>
                        你进入了${company}，职位是${position}，职级是${level}。`;

    startBtn.style.display = 'none';
    generateChoices();
}

startBtn.addEventListener('click', startGame);