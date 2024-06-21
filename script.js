
const circle =document.querySelector(".circle")
const text =circle.innerText

circle.innerText ='';
for (let i = 0; i < text.length; i++){
    let letter = text[i]
    let span =document.createElement('span')
    span.innerText = letter;
    let r =(360/text.length)*i;
    span.style.transform ='rotate(' + r + 'deg)';
    circle.appendChild(span);
}

let panel=document.querySelectorAll('.panel');

document.addEventListener("DOMContentLoaded", function() {
    gsap.fromTo('.floating image', {
      x:20,
      y:80
    }, {
      backgroundColor: '#abffff',
      scrollTrigger: '.box',
      x: 800,
      duration: 3,
      rotation: 90,
    });
  });
  
// 设置选中态样式
function setActive(){
    // 遍历所有.item元素，移出active样式
    panel.forEach((panel)=>{
        panel.classList.remove('active');
    })
    // 为当前选中项添加active样式
    this.classList.add('active');
}
// 遍历所有.item元素，分别为其设置点击事件
panel.forEach((panel)=>{
    panel.addEventListener('click',setActive);
})
// 鼠标移动事件
document.addEventListener('mousemove', function(e) {
  const cursor = document.getElementById('cursor');
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});
const cursor = document.getElementById('cursor');
const maxTrails = 3; // 设置最大拖尾数量
const trails = []; // 存储拖尾元素的数组

document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.left = (e.pageX + 10) + 'px'; // 向右移动 10 像素
  trail.style.top = (e.pageY - 10) + 'px'; // 向上移动 10 像素
  document.body.appendChild(trail);

  trails.push(trail); // 将新拖尾元素添加到数组中

  // 如果超过最大拖尾数量，移除最旧的元素
  if (trails.length > maxTrails) {
    const oldTrail = trails.shift(); // 移除数组中的第一个元素
    oldTrail.remove(); // 从 DOM 中删除该元素
  }

  setTimeout(() => {
    trail.style.opacity = '0';
    setTimeout(() => {
      trail.remove();
    }, 10); // 确保动画结束后删除元素
  }, 80); // 立即开始淡出效果
});

document.querySelectorAll('a, button, .clickable').forEach(item => {
  item.addEventListener('mouseenter', function() {
    cursor.classList.add('trail-clickable');
  });
  item.addEventListener('mouseleave', function() {
    cursor.classList.remove('trail-clickable');
  });
});
document.addEventListener('mousemove', function(e) {
  const floatingImage = document.getElementById('floating-image');
  const moveX = (e.clientX / window.innerWidth) * 10 - 5;
  const moveY = (e.clientY / window.innerHeight) * 10 - 5;
  floatingImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
document.addEventListener("DOMContentLoaded", function() {
  // 創建一個 Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          // 如果目標進入視口
          if (entry.isIntersecting) {
              // 選擇目標元素
              const element = entry.target;

              // 使用 gsap 創建動畫
              gsap.fromTo(element, {
                  opacity: 0,
                  y: 50
              }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8, // 動畫持續時間
                  ease: 'power2.out', // 動畫緩和效果
                  onComplete: () => observer.unobserve(element) // 動畫完成後取消觀察
              });
          }
      });
  });

  // 選擇要觀察的目標元素
  const aboutMeTitle = document.querySelector('.about-me-title');
  const textContainers = document.querySelectorAll('.text-container1');
  const imageSections = document.querySelectorAll('.image-section');
  const marqueeContents = document.querySelectorAll('.marquee-content');
  const h1Element = document.querySelector('h1');
  const h2Element = document.querySelector('h2');

  // 將每個目標元素添加到觀察列表中
  if (aboutMeTitle) observer.observe(aboutMeTitle);
  textContainers.forEach(container => observer.observe(container));
  imageSections.forEach(section => observer.observe(section));
  marqueeContents.forEach(content => observer.observe(content));

  // 先觀察 h2 元素，然後觀察 h1 元素
  if (h2Element) observer.observe(h2Element);
  if (h1Element) observer.observe(h1Element);

  // 滚动效果设置
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".scroll-image", {
      xPercent: 230
  });

  gsap.to(".scroll-image", {
      xPercent: -23 * (document.querySelectorAll(".scroll-image").length - 1),
      ease: "none",
      scrollTrigger: {
          trigger: ".image-section",
          pin: true,
          scrub: 1,
          end: "+=800",
          snap: {
              snapTo: 1 / (document.querySelectorAll(".scroll-image").length - 1),
              duration: { min: 0.2, max: 0.3 },
              delay: 0.1,
          }
      }
  });

  // 跑马灯效果设置
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeContent) {
      const content = marqueeContent.innerHTML;
      marqueeContent.innerHTML = content + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
      content+ ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + content+ ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
      content+ ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + content;
  }

  // 自定义光标和拖尾效果
  const cursor = document.getElementById('cursor');
  const maxTrails = 3; // 设置最大拖尾数量
  const trails = []; // 存储拖尾元素的数组

  document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.pageX + 'px';
      cursor.style.top = e.pageY + 'px';

      const trail = document.createElement('div');
      trail.classList.add('trail');
      trail.style.left = (e.pageX + 10) + 'px'; // 向右移动 10 像素
      trail.style.top = (e.pageY - 10) + 'px'; // 向上移动 10 像素
      document.body.appendChild(trail);

      trails.push(trail); // 将新拖尾元素添加到数组中

      // 如果超过最大拖尾数量，移除最旧的元素
      if (trails.length > maxTrails) {
          const oldTrail = trails.shift(); // 移除数组中的第一个元素
          oldTrail.remove(); // 从 DOM 中删除该元素
      }

      setTimeout(() => {
          trail.style.opacity = '0';
          setTimeout(() => {
              trail.remove();
          }, 500); // 确保动画结束后删除元素
      }, 300); // 立即开始淡出效果
  });

  document.querySelectorAll('a, button, .clickable').forEach(item => {
      item.addEventListener('mouseenter', function() {
          cursor.classList.add('trail-clickable');
      });
      item.addEventListener('mouseleave', function() {
          cursor.classList.remove('trail-clickable');
      });
  });

  document.addEventListener('mousemove', function(e) {
      const floatingImage = document.getElementById('floating-image');
      const moveX = (e.clientX / window.innerWidth) * 10 - 5;
      const moveY = (e.clientY / window.innerHeight) * 10 - 5;
      floatingImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});


