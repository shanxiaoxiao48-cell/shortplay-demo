// 分镜导演 - 暗色主题交互逻辑

const state = {
  currentShot: 1,
  isPlaying: false,
  currentTime: 0,
  totalTime: 83,
  referenceImages: [],
  currentView: 'timeline',
  shotImages: {},
  generationCount: 0,
};

const SHOT_DATA = [
  { id: 1, img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=120&fit=crop', text: '"林婉儿愤怒地将文件摔在桌上，陆霆琛一把抓住她的手腕，眼神冷冽地看着她..."', duration: 3, history: [
    { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&h=400&fit=crop', type: 'video', prompt: '室内，现代办公室场景，傍晚时分。林婉儿愤怒地将文件摔在桌上。电影级调色，IMAX画质。' },
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=400&fit=crop', type: 'image', prompt: '办公室特写，文件散落桌面，紧张氛围。高清摄影。' }
  ] },
  { id: 2, img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=120&fit=crop', text: '"你放开我！"林婉儿挣扎着...', duration: 4, history: [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=400&fit=crop', type: 'video', prompt: '林婉儿挣扎着想要挣脱，表情愤怒。近景拍摄，电影级光影。' },
    { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop', type: 'image', prompt: '林婉儿面部特写，愤怒表情，泪光闪烁。' }
  ] },
  { id: 3, img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=120&fit=crop', text: '陆霆琛的声音低沉而危险...', duration: 5, history: [
    { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop', type: 'video', prompt: '陆霆琛低沉危险的表情，暗色调，电影级构图。' }
  ] },
  { id: 4, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=120&fit=crop', text: '林婉儿突然停止了挣扎...', duration: 6, history: [
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=400&fit=crop', type: 'video', prompt: '林婉儿停止挣扎，沉默对视。中景，柔和光线。' }
  ] },
  { id: 5, img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=120&fit=crop', text: '"陆霆琛，我们之间已经结束了。"', duration: 4, history: [
    { src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&h=400&fit=crop', type: 'video', prompt: '林婉儿说出分手，坚定眼神。特写镜头，电影调色。' }
  ] },
  { id: 6, img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=120&fit=crop', text: '陆霆琛愣住了，手渐渐松开。', duration: 5, history: [
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=400&fit=crop', type: 'video', prompt: '陆霆琛愣住，手慢慢松开。中景，情绪转折。' }
  ] },
  { id: 7, img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=120&fit=crop', text: '林婉儿转身离开，泪水模糊了视线...', duration: 6, history: [
    { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&h=400&fit=crop', type: 'video', prompt: '林婉儿转身离开，背影渐远，泪水滑落。全景，暖色调。' }
  ] },
  { id: 8, img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=120&fit=crop', text: '空荡荡的办公室，只剩下散落的文件...', duration: 5, history: [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=400&fit=crop', type: 'video', prompt: '空荡办公室，散落文件，寂静氛围。广角镜头，冷色调。' }
  ] },
  { id: 9, img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=120&fit=crop', text: '', duration: 5, history: [
    { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop', type: 'image', prompt: '窗外城市夜景，霓虹灯光。静态画面。' }
  ] },
  { id: 10, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=120&fit=crop', text: '', duration: 5, history: [
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=400&fit=crop', type: 'image', prompt: '办公室走廊，空旷安静。静态构图。' }
  ] },
];

document.addEventListener('DOMContentLoaded', function() {
  initNavigation(); initShotText(); initReferenceUpload(); initPromptInput();
  initGenerationControls(); initPreviewActions(); initAssetTabs();
  initAssetReference(); initAssetEdit(); initAssetCollections(); initHistoryActions();
  initTimeline(); initStoryboardSwitch(); initKeyboardShortcuts();
  buildTimelineShots(); initExportBtn();
  selectShot(0);
});

// ========== 导出按钮 ==========
function initExportBtn() {
  const btn = document.getElementById('exportBtn');
  if (btn) btn.addEventListener('click', () => showToast('正在导出...'));
  const batchBtn = document.getElementById('batchGenBtn');
  if (batchBtn) batchBtn.addEventListener('click', () => showBatchGenModal());
}

// ========== 选中分镜 - 更新左侧面板 ==========
function selectShot(shotIndex) {
  state.currentShot = shotIndex + 1;
  const shot = SHOT_DATA[shotIndex];
  if (!shot) return;
  // Update title
  const title = document.querySelector('.shot-title');
  if (title) title.textContent = `分镜${shot.id}`;
  // Update text content
  const textContent = document.getElementById('shotTextContent');
  if (textContent) {
    textContent.textContent = shot.text || '';
  }
  // Update preview box
  updatePreviewForShot(shot);
  // Update history section based on shot's history
  const historySection = document.querySelector('.history-section');
  if (historySection) {
    historySection.innerHTML = '';
    const history = shot.history || [];
    history.forEach(h => {
      const src = typeof h === 'string' ? h : h.src;
      const prompt = (typeof h === 'object' && h.prompt) ? h.prompt : '';
      const hType = (typeof h === 'object' && h.type) ? h.type : 'video';
      const card = createHistoryCard(src, prompt, hType);
      historySection.appendChild(card);
    });
  }
  // Update preview history sidebar
  const previewHistory = document.querySelector('.preview-history');
  if (previewHistory) {
    previewHistory.innerHTML = '';
    const history = shot.history || [];
    if (shot.img && history.length === 0) {
      const item = createPreviewHistoryItem(shot.img.replace('200&h=120', '300&h=400'));
      item.classList.add('active');
      previewHistory.appendChild(item);
    }
    history.forEach((h, i) => {
      const src = typeof h === 'string' ? h : h.src;
      const type = typeof h === 'string' ? 'video' : (h.type || 'video');
      const item = createPreviewHistoryItem(src, type);
      if (i === 0) item.classList.add('active');
      previewHistory.appendChild(item);
    });
  }
  // Highlight active shot in timeline
  document.querySelectorAll('.timeline-shot').forEach(s => s.classList.remove('active'));
  const activeShot = document.querySelector(`.timeline-shot[data-shot="${shot.id}"]`);
  if (activeShot) activeShot.classList.add('active');
  // Move playhead to the left edge of the selected shot
  movePlayheadToShot(shotIndex);
  // Re-init shot text editing
  initShotText();
}

function updatePreviewForShot(shot) {
  const previewBox = document.querySelector('.preview-box');
  if (!previewBox) return;
  const previewActions = document.querySelector('.preview-actions');
  const history = shot.history || [];
  if (shot.img || history.length > 0) {
    const firstH = history.length > 0 ? history[0] : null;
    const displaySrc = firstH
      ? (typeof firstH === 'string' ? firstH : firstH.src)
      : shot.img.replace('200&h=120', '300&h=400');
    previewBox.innerHTML = `<img src="${displaySrc}" alt="预览">`;
    // Hide actions if first history item is image type
    const firstType = firstH ? (typeof firstH === 'string' ? 'video' : (firstH.type || 'video')) : 'video';
    if (previewActions) previewActions.style.display = firstType === 'image' ? 'none' : '';
  } else {
    previewBox.innerHTML = `<div class="preview-empty-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
    if (previewActions) previewActions.style.display = 'none';
  }
}

function getShotIndexAtPlayhead() {
  const playhead = document.getElementById('timelinePlayhead');
  const timelineContent = document.getElementById('timelineContent');
  if (!playhead || !timelineContent) return 0;
  const x = parseFloat(playhead.style.left) || 0;
  const shots = timelineContent.querySelectorAll('.timeline-shot');
  let foundIdx = 0;
  shots.forEach((shotEl, i) => {
    if (x >= shotEl.offsetLeft) foundIdx = i;
  });
  return foundIdx;
}

function syncPreviewToPlayhead() {
  const idx = getShotIndexAtPlayhead();
  if (idx !== state.currentShot - 1) {
    state.currentShot = idx + 1;
    const shot = SHOT_DATA[idx];
    if (!shot) return;
    // Update title
    const title = document.querySelector('.shot-title');
    if (title) title.textContent = `分镜${shot.id}`;
    // Update text
    const textContent = document.getElementById('shotTextContent');
    if (textContent) textContent.textContent = shot.text || '';
    // Update preview
    updatePreviewForShot(shot);
    // Highlight active shot
    document.querySelectorAll('.timeline-shot').forEach(s => s.classList.remove('active'));
    const activeShot = document.querySelector(`.timeline-shot[data-shot="${shot.id}"]`);
    if (activeShot) activeShot.classList.add('active');
    // Update history
    const historySection = document.querySelector('.history-section');
    if (historySection) {
      historySection.innerHTML = '';
      (shot.history || []).forEach(h => {
        const src = typeof h === 'string' ? h : h.src;
        const prompt = (typeof h === 'object' && h.prompt) ? h.prompt : '';
        const hType = (typeof h === 'object' && h.type) ? h.type : 'video';
        historySection.appendChild(createHistoryCard(src, prompt, hType));
      });
    }
    const previewHistory = document.querySelector('.preview-history');
    if (previewHistory) {
      previewHistory.innerHTML = '';
      const history = shot.history || [];
      if (shot.img && history.length === 0) {
        const item = createPreviewHistoryItem(shot.img.replace('200&h=120', '300&h=400'));
        item.classList.add('active');
        previewHistory.appendChild(item);
      }
      history.forEach((h, hi) => {
        const src = typeof h === 'string' ? h : h.src;
        const type = typeof h === 'string' ? 'video' : (h.type || 'video');
        const item = createPreviewHistoryItem(src, type);
        if (hi === 0) item.classList.add('active');
        previewHistory.appendChild(item);
      });
    }
    initShotText();
  }
}

function movePlayheadToShot(shotIndex) {
  const playhead = document.getElementById('timelinePlayhead');
  const timelineContent = document.getElementById('timelineContent');
  if (!playhead || !timelineContent) return;
  const shots = timelineContent.querySelectorAll('.timeline-shot');
  if (!shots[shotIndex]) return;
  const shotEl = shots[shotIndex];
  const x = shotEl.offsetLeft;
  playhead.style.left = x + 'px';
  // Calculate cumulative time up to this shot
  let cumTime = 0;
  for (let i = 0; i < shotIndex; i++) {
    cumTime += (SHOT_DATA[i]?.duration || 5);
  }
  state.currentTime = cumTime;
  updateTimeDisplay();
}

function createHistoryCard(src, promptText, type) {
  type = type || 'video';
  const card = document.createElement('div');
  card.className = 'history-card'; card.style.marginTop = '8px';
  const displayPrompt = promptText || document.getElementById('promptInput')?.textContent?.substring(0, 80) || '';
  card.innerHTML = `<div class="history-card-inner"><img src="${src}" alt="历史"></div>
    <div class="history-overlay"><div class="history-prompt">${displayPrompt}</div>
    <div class="history-actions"><button class="history-btn" data-action="reference" title="引用"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/></svg><span>引用</span></button>
    <button class="history-btn" data-action="download" title="下载"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>下载</span></button></div></div>`;
  card.querySelectorAll('.history-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const action = this.getAttribute('data-action');
      if (action === 'reference') {
        addReferenceImage(src, type);
        if (displayPrompt) {
          const promptInput = document.getElementById('promptInput');
          if (promptInput) promptInput.textContent = displayPrompt;
        }
      }
      else if (action === 'download') { downloadImage(src); }
    });
  });
  return card;
}

function createPreviewHistoryItem(src, type) {
  type = type || 'video';
  const item = document.createElement('div');
  item.className = 'preview-history-item';
  const thumbSrc = src.replace('300&h=400', '100&h=100');
  const iconSvg = type === 'image'
    ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>'
    : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  item.innerHTML = `<img src="${thumbSrc}" alt="历史">
    <div class="history-type-icon ${type}">${iconSvg}</div>`;
  item.addEventListener('click', () => selectPreviewHistory(item, src));
  return item;
}

// ========== 导航栏 ==========
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ========== 分镜原文编辑 ==========
function initShotText() {
  const editBtn = document.getElementById('editTextBtn');
  const textContent = document.getElementById('shotTextContent');
  if (!editBtn || !textContent) return;
  // Remove old listeners by cloning
  const newBtn = editBtn.cloneNode(true);
  editBtn.parentNode.replaceChild(newBtn, editBtn);
  newBtn.addEventListener('click', function() {
    const currentText = textContent.textContent;
    const textarea = document.createElement('textarea');
    textarea.className = 'shot-text-edit';
    textarea.value = currentText;
    textarea.style.cssText = `width:100%;min-height:80px;background:var(--bg-elevated);border:1px solid var(--primary);border-radius:var(--radius-sm);padding:10px;color:var(--text-primary);font-size:13px;line-height:1.5;resize:vertical;font-family:inherit;`;
    textContent.replaceWith(textarea);
    textarea.focus();
    const saveEdit = () => {
      const newContent = document.createElement('div');
      newContent.className = 'shot-text-content'; newContent.id = 'shotTextContent';
      newContent.textContent = textarea.value;
      textarea.replaceWith(newContent);
      // Save back to SHOT_DATA
      const shotIdx = state.currentShot - 1;
      if (SHOT_DATA[shotIdx]) SHOT_DATA[shotIdx].text = textarea.value;
      initShotText();
    };
    textarea.addEventListener('blur', saveEdit);
    textarea.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'Enter') saveEdit(); });
  });
}

// ========== 参考图上传 ==========
function initReferenceUpload() {
  const refFileInput = document.getElementById('refFileInput');
  const refAddBox = document.getElementById('refAddBox');
  if (!refFileInput || !refAddBox) return;
  refAddBox.addEventListener('click', e => { if (e.target !== refFileInput) refFileInput.click(); });
  refFileInput.addEventListener('change', e => {
    Array.from(e.target.files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        const ft = file.type.startsWith('video/') ? 'video' : 'image';
        reader.onload = ev => addReferenceImage(ev.target.result, ft);
        reader.readAsDataURL(file);
      }
    });
    refFileInput.value = '';
  });
  refAddBox.addEventListener('dragover', e => { e.preventDefault(); refAddBox.style.borderColor = 'var(--primary)'; });
  refAddBox.addEventListener('dragleave', e => { e.preventDefault(); refAddBox.style.borderColor = ''; });
  refAddBox.addEventListener('drop', e => {
    e.preventDefault(); refAddBox.style.borderColor = '';
    Array.from(e.dataTransfer.files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        const ft = file.type.startsWith('video/') ? 'video' : 'image';
        reader.onload = ev => addReferenceImage(ev.target.result, ft);
        reader.readAsDataURL(file);
      }
    });
  });
}

function addReferenceImage(imageSrc, type, name) {
  type = type || 'image';
  if (!name) {
    // Auto-generate name based on current shot and type
    const typeLabel = type === 'video' ? '视频' : '图片';
    const typeCount = state.referenceImages.filter(r => r.type === type).length + 1;
    name = `分镜${state.currentShot}-${typeLabel}${typeCount}`;
  }
  const referenceStack = document.getElementById('referenceStack');
  if (!referenceStack) return;
  const angles = [-8, 6, -4, 10, -6];
  const index = state.referenceImages.length;
  const imageItem = document.createElement('div');
  imageItem.className = 'ref-image-item';
  // All images at same position (0,0), only rotation differs — centers overlap
  imageItem.style.left = '0px';
  imageItem.style.top = '0px';
  imageItem.style.transform = `rotate(${angles[index % angles.length]}deg)`;
  imageItem.style.zIndex = index + 1;
  const img = document.createElement('img'); img.src = imageSrc; imageItem.appendChild(img);
  if (type === 'video') {
    const badge = document.createElement('div');
    badge.className = 'ref-type-badge';
    badge.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    imageItem.appendChild(badge);
  }
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'ref-image-delete'; deleteBtn.innerHTML = '✕';
  deleteBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const i = state.referenceImages.findIndex(r => r.src === imageSrc && r.name === name);
    if (i > -1) state.referenceImages.splice(i, 1);
    imageItem.remove();
    if (state.referenceImages.length === 0) referenceStack.classList.remove('has-images');
    repositionRefAddBtn();
    updatePromptPlaceholder();
  });
  imageItem.appendChild(deleteBtn);
  imageItem.addEventListener('click', function(e) {
    if (e.target.closest('.ref-image-delete')) return;
    if (type === 'video') {
      const refIndex = state.referenceImages.findIndex(r => r.src === imageSrc && r.name === name);
      showVideoFrameModal(imageSrc, name, refIndex);
    }
  });
  const refAddBox = document.getElementById('refAddBox');
  referenceStack.insertBefore(imageItem, refAddBox);
  state.referenceImages.push({ src: imageSrc, type, name });
  referenceStack.classList.add('has-images');
  repositionRefAddBtn();
  updatePromptPlaceholder();
}

function rebuildReferenceStack() {
  const referenceStack = document.getElementById('referenceStack');
  if (!referenceStack) return;
  
  // 清除所有现有的参考图（保留添加按钮）
  const refAddBox = document.getElementById('refAddBox');
  const existingItems = referenceStack.querySelectorAll('.ref-image-item');
  existingItems.forEach(item => item.remove());
  
  // 重新添加所有参考图
  const angles = [-8, 6, -4, 10, -6];
  state.referenceImages.forEach((ref, index) => {
    const imageItem = document.createElement('div');
    imageItem.className = 'ref-image-item';
    imageItem.style.left = '0px';
    imageItem.style.top = '0px';
    imageItem.style.transform = `rotate(${angles[index % angles.length]}deg)`;
    imageItem.style.zIndex = index + 1;
    
    const img = document.createElement('img');
    img.src = ref.src;
    imageItem.appendChild(img);
    
    if (ref.type === 'video') {
      const badge = document.createElement('div');
      badge.className = 'ref-type-badge';
      badge.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      imageItem.appendChild(badge);
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'ref-image-delete';
    deleteBtn.innerHTML = '✕';
    deleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      state.referenceImages.splice(index, 1);
      rebuildReferenceStack();
      if (state.referenceImages.length === 0) referenceStack.classList.remove('has-images');
      repositionRefAddBtn();
      updatePromptPlaceholder();
    });
    imageItem.appendChild(deleteBtn);
    
    imageItem.addEventListener('click', function(e) {
      if (e.target.closest('.ref-image-delete')) return;
      if (ref.type === 'video') {
        showVideoFrameModal(ref.src, ref.name, index);
      }
    });
    
    referenceStack.insertBefore(imageItem, refAddBox);
  });
  
  if (state.referenceImages.length > 0) {
    referenceStack.classList.add('has-images');
  } else {
    referenceStack.classList.remove('has-images');
  }
  
  repositionRefAddBtn();
  updatePromptPlaceholder();
}

function repositionRefAddBtn() {
  const referenceStack = document.getElementById('referenceStack');
  const refAddBox = document.getElementById('refAddBox');
  if (!referenceStack || !refAddBox) return;
  const count = state.referenceImages.length;
  if (count === 0) {
    refAddBox.style.left = '';
    refAddBox.style.bottom = '';
    refAddBox.style.top = '';
    refAddBox.style.right = '';
    return;
  }
  // All images stacked at same position, add button at bottom-right corner
  refAddBox.style.left = '38px';
  refAddBox.style.bottom = '-4px';
  refAddBox.style.top = 'auto';
  refAddBox.style.right = 'auto';
}

function clearReferenceImages() {
  const referenceStack = document.getElementById('referenceStack');
  if (!referenceStack) return;
  referenceStack.querySelectorAll('.ref-image-item').forEach(item => item.remove());
  state.referenceImages = [];
  referenceStack.classList.remove('has-images');
  repositionRefAddBtn();
  updatePromptPlaceholder();
}

// ========== 提示词输入 ==========
function initPromptInput() {
  const promptInput = document.getElementById('promptInput');
  const optimizeBtn = document.getElementById('optimizeBtn');
  if (!promptInput) return;
  promptInput.addEventListener('input', function() {
    // @ mention detection
    handleAtMention(this);
  });
  if (optimizeBtn) {
    optimizeBtn.addEventListener('click', function() {
      const original = promptInput.textContent;
      promptInput.textContent = '正在优化提示词...'; promptInput.contentEditable = 'false';
      setTimeout(() => {
        promptInput.textContent = original + '\n\n电影级调色，IMAX画质，精细光影，专业摄影，细节丰富，超高清8K，HDR效果，视觉盛宴。';
        promptInput.contentEditable = 'true';
      }, 1000);
    });
  }
}

function updatePromptPlaceholder() {
  const promptInput = document.getElementById('promptInput');
  if (!promptInput) return;
  if (state.referenceImages.length > 0) {
    promptInput.setAttribute('data-placeholder', '使用@快速调用参考内容');
  } else {
    promptInput.setAttribute('data-placeholder', '请输入提示词...');
  }
}

function handleAtMention(el) {
  const sel = window.getSelection();
  if (!sel.rangeCount) { const existing = document.querySelector('.at-mention-dropdown'); if (existing) existing.remove(); return; }
  const node = sel.anchorNode;
  if (!node || node.nodeType !== Node.TEXT_NODE) {
    const existing = document.querySelector('.at-mention-dropdown');
    if (existing) existing.remove();
    return;
  }
  const textBefore = node.textContent.substring(0, sel.anchorOffset);
  const atIndex = textBefore.lastIndexOf('@');
  const existing = document.querySelector('.at-mention-dropdown');
  if (existing) existing.remove();
  if (atIndex === -1 || state.referenceImages.length === 0) return;
  const query = textBefore.substring(atIndex + 1);
  if (query.includes('\n')) return;

  injectGenSettingsStyles();
  const dropdown = document.createElement('div');
  dropdown.className = 'at-mention-dropdown';
  dropdown.innerHTML = `<div class="at-mention-title">可能@的内容</div>`;
  state.referenceImages.forEach((ref, i) => {
    const name = ref.name || `图片${i + 1}`;
    if (query && !name.includes(query)) return;
    const item = document.createElement('div');
    item.className = 'at-mention-item';
    item.innerHTML = `<img src="${ref.src}" alt="${name}"><span>${name}</span>`;
    item.addEventListener('mousedown', function(e) {
      e.preventDefault();
      const deleteRange = document.createRange();
      deleteRange.setStart(node, atIndex);
      deleteRange.setEnd(node, sel.anchorOffset);
      deleteRange.deleteContents();
      const tag = document.createElement('span');
      tag.className = 'at-tag';
      tag.contentEditable = 'false';
      tag.textContent = '@' + name;
      const insertRange = document.createRange();
      insertRange.setStart(node, atIndex);
      insertRange.collapse(true);
      insertRange.insertNode(tag);
      const space = document.createTextNode('\u00A0');
      tag.after(space);
      const newRange = document.createRange();
      newRange.setStartAfter(space);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
      dropdown.remove();
      el.focus();
    });
    dropdown.appendChild(item);
  });
  if (dropdown.querySelectorAll('.at-mention-item').length === 0) return;
  const rect = el.getBoundingClientRect();
  dropdown.style.position = 'fixed';
  dropdown.style.left = rect.left + 'px';
  dropdown.style.width = rect.width + 'px';
  document.body.appendChild(dropdown);
  const dh = dropdown.offsetHeight;
  dropdown.style.top = (rect.top - dh - 4) + 'px';
  el.addEventListener('blur', function onBlur() {
    setTimeout(() => { const d = document.querySelector('.at-mention-dropdown'); if (d) d.remove(); }, 200);
    el.removeEventListener('blur', onBlur);
  });
}


// ========== 生成控制 ==========
function initGenerationControls() {
  const voiceBtn = document.getElementById('voiceSelectBtn');
  const generateBtn = document.getElementById('generateBtn');
  const settingsBtn = document.getElementById('genSettingsBtn');
  const genType = document.getElementById('generationType');
  if (voiceBtn) voiceBtn.addEventListener('click', showVoiceModal);
  if (generateBtn) generateBtn.addEventListener('click', handleGenerate);
  if (settingsBtn) settingsBtn.addEventListener('click', showGenSettingsModal);
  if (genType) {
    genType.addEventListener('change', function() {
      const voiceWrapper = document.getElementById('voiceWrapper');
      if (voiceWrapper) voiceWrapper.style.display = this.value === '图片生成' ? 'none' : '';
    });
  }
}

function handleGenerate() {
  const btn = document.getElementById('generateBtn');
  const type = document.getElementById('generationType').value;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="30"/></svg> 生成中...`;
  btn.disabled = true; btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 成功`;
    btn.style.background = '#52c41a';
    showToast(`${type}成功！`);
    addGenerationResult();
    // Clear prompt input after successful generation
    const promptInput = document.getElementById('promptInput');
    if (promptInput) promptInput.textContent = '';
    // Clear reference images
    clearReferenceImages();
    setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; btn.style.opacity = ''; btn.disabled = false; }, 2000);
  }, 3000);
}

// 生成完成后：添加历史卡片 + 预览历史图框 + 更新分镜数据
function addGenerationResult() {
  state.generationCount++;
  const newImgs = [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=400&fit=crop',
  ];
  const newSrc = newImgs[state.generationCount % newImgs.length];
  const shotIdx = state.currentShot - 1;
  const shot = SHOT_DATA[shotIdx];

  // Save to shot data
  if (shot) {
    if (!shot.history) shot.history = [];
    const genType = document.getElementById('generationType')?.value === '图片生成' ? 'image' : 'video';
    const promptText = document.getElementById('promptInput')?.textContent?.trim() || '';
    shot.history.unshift({ src: newSrc, type: genType, prompt: promptText });
    // Update shot image (use latest generation)
    shot.img = newSrc.replace('300&h=400', '200&h=120');
  }

  // Update timeline shot card thumbnail
  const shotEl = document.querySelector(`.timeline-shot[data-shot="${state.currentShot}"]`);
  if (shotEl) {
    const thumb = shotEl.querySelector('.shot-thumb');
    if (thumb) {
      thumb.innerHTML = `<img src="${shot.img}" alt="分镜${state.currentShot}">`;
    }
  }

  // 1. 添加历史卡片到分镜操作区
  const historySection = document.querySelector('.history-section');
  if (historySection) {
    const promptText = document.getElementById('promptInput')?.textContent?.substring(0, 80) || '';
    const genType = document.getElementById('generationType')?.value === '图片生成' ? 'image' : 'video';
    const card = createHistoryCard(newSrc, promptText, genType);
    historySection.prepend(card);
  }
  // 2. 添加预览历史图框
  const previewHistory = document.querySelector('.preview-history');
  if (previewHistory) {
    const genType = document.getElementById('generationType')?.value === '图片生成' ? 'image' : 'video';
    const item = createPreviewHistoryItem(newSrc, genType);
    previewHistory.prepend(item);
    selectPreviewHistory(item, newSrc);
  }
  // 3. Update preview box with the new image
  if (shot) updatePreviewForShot(shot);
}

function selectPreviewHistory(item, src) {
  document.querySelectorAll('.preview-history-item').forEach(h => h.classList.remove('active'));
  item.classList.add('active');
  // 更新预览框
  const previewBox = document.querySelector('.preview-box');
  if (previewBox) previewBox.innerHTML = `<img src="${src}" alt="预览">`;
  // Detect type from the icon badge
  const typeIcon = item.querySelector('.history-type-icon');
  const isImage = typeIcon && typeIcon.classList.contains('image');
  // Show/hide actions based on type
  const previewActions = document.querySelector('.preview-actions');
  if (previewActions) previewActions.style.display = isImage ? 'none' : '';
  // If image type, set current shot duration to 2s and rebuild timeline
  if (isImage) {
    const shotIdx = state.currentShot - 1;
    if (SHOT_DATA[shotIdx] && SHOT_DATA[shotIdx].duration !== 2) {
      SHOT_DATA[shotIdx].duration = 2;
      if (state.currentView === 'timeline') {
        buildTimelineShots();
        initPlayhead();
        selectTimelineShotHighlight(shotIdx);
      }
    }
  }
  // 更新时间轴当前选中分镜的图片
  const activeShot = document.querySelector('.timeline-shot.active .shot-thumb img');
  if (activeShot) activeShot.src = src.replace('300&h=400', '200&h=120');
}

function selectTimelineShotHighlight(shotIdx) {
  document.querySelectorAll('.timeline-shot').forEach(s => s.classList.remove('active'));
  const shot = SHOT_DATA[shotIdx];
  if (shot) {
    const el = document.querySelector(`.timeline-shot[data-shot="${shot.id}"]`);
    if (el) el.classList.add('active');
  }
}

// ========== 旁白音色弹窗面板 ==========
const VOICE_DATA = [
  {name:'直爽女大',gender:'女',age:'青年'},{name:'纯净女声',gender:'女',age:'青年'},{name:'含蓄女声',gender:'女',age:'青年'},
  {name:'明媚女声',gender:'女',age:'青年'},{name:'温柔女声',gender:'女',age:'青年'},{name:'甜美少女',gender:'女',age:'少年'},
  {name:'活泼少女',gender:'女',age:'少年'},{name:'知性女声',gender:'女',age:'中年'},{name:'优雅女声',gender:'女',age:'中年'},
  {name:'慈祥奶奶',gender:'女',age:'老年'},{name:'童真女孩',gender:'女',age:'幼儿'},{name:'可爱萝莉',gender:'女',age:'幼儿'},
  {name:'沉稳男声',gender:'男',age:'青年'},{name:'阳光小男孩',gender:'男',age:'少年'},{name:'磁性男声',gender:'男',age:'青年'},
  {name:'低沉男声',gender:'男',age:'中年'},{name:'温暖男声',gender:'男',age:'青年'},{name:'霸气男声',gender:'男',age:'中年'},
  {name:'儒雅男声',gender:'男',age:'中年'},{name:'少年音',gender:'男',age:'少年'},{name:'正太音',gender:'男',age:'幼儿'},
  {name:'慈祥爷爷',gender:'男',age:'老年'},{name:'沧桑男声',gender:'男',age:'老年'},{name:'播音男声',gender:'男',age:'青年'},
  {name:'清澈女声',gender:'女',age:'青年'},{name:'御姐音',gender:'女',age:'青年'},{name:'软萌女声',gender:'女',age:'少年'},
  {name:'干练女声',gender:'女',age:'中年'},{name:'豪迈男声',gender:'男',age:'中年'},{name:'书生音',gender:'男',age:'青年'},
  {name:'童声男孩',gender:'男',age:'幼儿'},{name:'童声女孩',gender:'女',age:'幼儿'},
];

let selectedVoice = null;

function showVoiceModal() {
  injectModalStyles(); injectGenSettingsStyles();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  let filterGender = '', filterAge = '';

  function renderVoices() {
    const filtered = VOICE_DATA.filter(v => {
      if (filterGender && v.gender !== filterGender) return false;
      if (filterAge && v.age !== filterAge) return false;
      return true;
    });
    return filtered.map(v =>
      `<div class="voice-grid-item${selectedVoice === v.name ? ' active' : ''}" data-name="${v.name}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
        <span>${v.name}</span>
      </div>`
    ).join('');
  }

  function buildContent() {
    modal.innerHTML = `<div class="modal-content" style="max-width:480px;">
      <div class="modal-header"><h3>旁白音色</h3><button class="modal-close-btn" id="voiceModalClose"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
      <div class="modal-body">
        <div class="voice-filters">
          <div class="voice-filter-group"><label>性别</label>
            <div class="voice-filter-options">
              <button class="voice-filter-btn${filterGender===''?' active':''}" data-filter="gender" data-val="">全部</button>
              <button class="voice-filter-btn${filterGender==='男'?' active':''}" data-filter="gender" data-val="男">男</button>
              <button class="voice-filter-btn${filterGender==='女'?' active':''}" data-filter="gender" data-val="女">女</button>
            </div>
          </div>
          <div class="voice-filter-group"><label>年龄</label>
            <div class="voice-filter-options">
              <button class="voice-filter-btn${filterAge===''?' active':''}" data-filter="age" data-val="">全部</button>
              <button class="voice-filter-btn${filterAge==='幼儿'?' active':''}" data-filter="age" data-val="幼儿">幼儿</button>
              <button class="voice-filter-btn${filterAge==='少年'?' active':''}" data-filter="age" data-val="少年">少年</button>
              <button class="voice-filter-btn${filterAge==='青年'?' active':''}" data-filter="age" data-val="青年">青年</button>
              <button class="voice-filter-btn${filterAge==='中年'?' active':''}" data-filter="age" data-val="中年">中年</button>
              <button class="voice-filter-btn${filterAge==='老年'?' active':''}" data-filter="age" data-val="老年">老年</button>
            </div>
          </div>
        </div>
        <div class="voice-grid" id="voiceGrid">${renderVoices()}</div>
      </div>
      <div class="modal-footer" style="justify-content:flex-end;">
        <button class="modal-btn apply-btn" id="voiceConfirmBtn">确认</button>
      </div>
    </div>`;
    bindVoiceEvents();
  }

  function bindVoiceEvents() {
    modal.querySelector('#voiceModalClose').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    modal.querySelectorAll('.voice-filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const f = this.getAttribute('data-filter');
        const v = this.getAttribute('data-val');
        if (f === 'gender') filterGender = v;
        else if (f === 'age') filterAge = v;
        buildContent();
      });
    });
    modal.querySelectorAll('.voice-grid-item').forEach(item => {
      item.addEventListener('click', function() {
        modal.querySelectorAll('.voice-grid-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        selectedVoice = this.getAttribute('data-name');
      });
    });
    modal.querySelector('#voiceConfirmBtn').addEventListener('click', () => {
      if (selectedVoice) {
        document.querySelector('#voiceSelectBtn span').textContent = selectedVoice;
      }
      modal.remove();
    });
  }

  buildContent();
  document.body.appendChild(modal);
}

// ========== 生成设置弹窗 ==========
const GEN_SETTINGS = {
  brands: [
    {
      name: '即梦', key: 'jimeng',
      desc: '字节跳动即梦Seedance视频生成模型，支持高质量视频生成，画面细腻流畅，动作自然真实',
      models: ['Seedance 2.0', 'Seedance 1.5pro'],
      modelRes: { 'Seedance 2.0': ['720p'], 'Seedance 1.5pro': ['720p', '1080p'] },
      durations: ['自动匹配', '5s', '10s', '15s'],
      resolutions: ['720p', '1080p'],
      ratios: ['16:9', '9:16', '4:3', '3:4', '1:1']
    },
    {
      name: '万相', key: 'wanxiang',
      desc: '通义万相视频生成模型，支持多种风格和场景的高质量视频创作',
      models: ['Wan 2.6', 'Wan 2.5', 'Wan 2.0'],
      durations: ['5s', '8s', '10s'],
      resolutions: ['720p', '1080p'],
      ratios: ['16:9', '9:16', '4:3', '3:4', '1:1']
    },
    {
      name: 'Vidu', key: 'vidu',
      desc: '生数科技Vidu视频生成模型，擅长人物动态和电影级画面表现',
      models: ['Vidu 2.0', 'Vidu 1.5', 'Vidu 1.0'],
      durations: ['4s', '8s', '16s'],
      resolutions: ['720p', '1080p'],
      ratios: ['16:9', '9:16', '4:3', '3:4', '1:1']
    }
  ],
  imgBrands: [
    {
      name: '即梦', key: 'jimeng',
      desc: '即梦图片生成模型，支持多种风格和比例的高质量图片创作',
      models: ['Seedream 2.0', 'Seedream 1.5'],
      ratios: ['16:9', '9:16', '4:3', '3:4', '1:1']
    },
    {
      name: '万相', key: 'wanxiang',
      desc: '通义万相图片生成模型，擅长多风格高清图片生成',
      models: ['Wan-img 2.0', 'Wan-img 1.5'],
      ratios: ['16:9', '9:16', '4:3', '3:4', '1:1']
    },
    {
      name: 'Vidu', key: 'vidu',
      desc: 'Vidu图片生成模型，擅长人物肖像和场景图片',
      models: ['Vidu-img 2.0', 'Vidu-img 1.0'],
      ratios: ['16:9', '9:16', '4:3', '3:4', '1:1']
    }
  ],
  current: { brand: 'jimeng', model: 'Seedance 2.0', duration: '5s', resolution: '720p', ratio: '16:9', soundEffect: false },
  currentImg: { brand: 'jimeng', model: 'Seedream 2.0', ratio: '16:9' }
};

function showGenSettingsModal() {
  injectModalStyles(); injectGenSettingsStyles();
  const isImageMode = document.getElementById('generationType').value === '图片生成';
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';

  function getVideoBrand() {
    const s = GEN_SETTINGS.current;
    return GEN_SETTINGS.brands.find(b => b.key === s.brand) || GEN_SETTINGS.brands[0];
  }
  function getImgBrand() {
    const s = GEN_SETTINGS.currentImg;
    return GEN_SETTINGS.imgBrands.find(b => b.key === s.brand) || GEN_SETTINGS.imgBrands[0];
  }
  function getResolutions(brand, model) {
    if (brand.modelRes && brand.modelRes[model]) return brand.modelRes[model];
    return brand.resolutions;
  }

  function renderBody() {
    if (isImageMode) {
      const s = GEN_SETTINGS.currentImg;
      const brand = getImgBrand();
      return `<div class="gs-brand-desc"><strong>${s.model}</strong><p>${brand.desc}</p></div>
        <div class="gs-row"><label>模型版本</label><div class="gs-options">${brand.models.map(m =>
          `<button class="gs-option${m===s.model?' active':''}" data-field="model" data-val="${m}">${m}</button>`
        ).join('')}</div></div>
        <div class="gs-row"><label>比例</label><div class="gs-options">${brand.ratios.map(r =>
          `<button class="gs-option${r===s.ratio?' active':''}" data-field="ratio" data-val="${r}">${r}</button>`
        ).join('')}</div></div>`;
    } else {
      const s = GEN_SETTINGS.current;
      const brand = getVideoBrand();
      const resolutions = getResolutions(brand, s.model);
      return `<div class="gs-brand-desc"><strong>${s.model}</strong><p>${brand.desc}</p></div>
        <div class="gs-row"><label>模型版本</label><div class="gs-options">${brand.models.map(m =>
          `<button class="gs-option${m===s.model?' active':''}" data-field="model" data-val="${m}">${m}</button>`
        ).join('')}</div></div>
        <div class="gs-row"><label>时长</label><div class="gs-options">${brand.durations.map(d =>
          `<button class="gs-option${d===s.duration?' active':''}" data-field="duration" data-val="${d}">${d}</button>`
        ).join('')}</div></div>
        <div class="gs-row"><label>清晰度</label><div class="gs-options">${resolutions.map(r =>
          `<button class="gs-option${r===s.resolution?' active':''}" data-field="resolution" data-val="${r}">${r}</button>`
        ).join('')}</div></div>
        <div class="gs-row"><label>比例</label><div class="gs-options">${brand.ratios.map(r =>
          `<button class="gs-option${r===s.ratio?' active':''}" data-field="ratio" data-val="${r}">${r}</button>`
        ).join('')}</div></div>
        <div class="gs-row gs-toggle-row"><label>开启音效</label><span class="gs-toggle-hint">同时生成音效和视频</span>
          <label class="gs-toggle"><input type="checkbox" id="gsSoundToggle" ${s.soundEffect?'checked':''}><span class="gs-toggle-slider"></span></label>
        </div>`;
    }
  }

  function renderTabs() {
    const brands = isImageMode ? GEN_SETTINGS.imgBrands : GEN_SETTINGS.brands;
    const currentBrand = isImageMode ? GEN_SETTINGS.currentImg.brand : GEN_SETTINGS.current.brand;
    return brands.map(b =>
      `<button class="gs-tab${b.key===currentBrand?' active':''}" data-brand="${b.key}">${b.name}</button>`
    ).join('');
  }

  // Build full modal once
  modal.innerHTML = `<div class="modal-content" style="max-width:520px;">
    <div class="modal-header" style="border-bottom:none;padding-bottom:0;">
      <div class="gs-tabs" id="gsTabs">${renderTabs()}</div>
      <button class="modal-close-btn" id="gsCloseBtn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal-body" style="padding-top:10px;" id="gsBody">${renderBody()}</div>
    <div class="modal-footer" style="justify-content:flex-end;">
      <button class="modal-btn apply-btn" id="gsConfirmBtn">确认</button>
    </div>
  </div>`;

  function refreshContent() {
    document.getElementById('gsTabs').innerHTML = renderTabs();
    document.getElementById('gsBody').innerHTML = renderBody();
    bindInnerEvents();
  }

  function bindInnerEvents() {
    modal.querySelectorAll('.gs-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const key = this.getAttribute('data-brand');
        if (isImageMode) {
          const s = GEN_SETTINGS.currentImg;
          s.brand = key;
          const brand = getImgBrand();
          s.model = brand.models[0]; s.ratio = brand.ratios[0];
        } else {
          const s = GEN_SETTINGS.current;
          s.brand = key;
          const brand = getVideoBrand();
          s.model = brand.models[0]; s.duration = brand.durations[0]; s.ratio = brand.ratios[0];
          const res = getResolutions(brand, s.model);
          s.resolution = res[0];
        }
        refreshContent();
      });
    });
    modal.querySelectorAll('.gs-option').forEach(opt => {
      opt.addEventListener('click', function() {
        const field = this.getAttribute('data-field');
        const val = this.getAttribute('data-val');
        if (isImageMode) {
          GEN_SETTINGS.currentImg[field] = val;
        } else {
          GEN_SETTINGS.current[field] = val;
          // If model changed, check resolution is still valid
          if (field === 'model') {
            const brand = getVideoBrand();
            const res = getResolutions(brand, val);
            if (!res.includes(GEN_SETTINGS.current.resolution)) GEN_SETTINGS.current.resolution = res[0];
          }
        }
        refreshContent();
      });
    });
  }

  // Bind outer events (close, confirm) — these don't need rebinding
  modal.querySelector('#gsCloseBtn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  modal.querySelector('#gsConfirmBtn').addEventListener('click', () => {
    if (!isImageMode) {
      const toggle = modal.querySelector('#gsSoundToggle');
      if (toggle) GEN_SETTINGS.current.soundEffect = toggle.checked;
      const s = GEN_SETTINGS.current;
      showToast(`设置已保存：${getVideoBrand().name} ${s.model} ${s.duration} ${s.resolution} ${s.ratio}`);
    } else {
      const s = GEN_SETTINGS.currentImg;
      showToast(`设置已保存：${getImgBrand().name} ${s.model} ${s.ratio}`);
    }
    modal.remove();
  });

  bindInnerEvents();
  document.body.appendChild(modal);
}

// ========== 批量生成弹窗 ==========
function showBatchGenModal() {
  injectModalStyles(); injectGenSettingsStyles();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  const s = GEN_SETTINGS.current;

  function getVideoBrand() {
    return GEN_SETTINGS.brands.find(b => b.key === s.brand) || GEN_SETTINGS.brands[0];
  }
  function getResolutions(brand, model) {
    if (brand.modelRes && brand.modelRes[model]) return brand.modelRes[model];
    return brand.resolutions;
  }

  function renderBody() {
    const brand = getVideoBrand();
    const resolutions = getResolutions(brand, s.model);
    return `<div class="gs-brand-desc"><strong>${s.model}</strong><p>${brand.desc}</p></div>
      <div class="gs-row"><label>模型版本</label><div class="gs-options">${brand.models.map(m =>
        `<button class="gs-option${m===s.model?' active':''}" data-field="model" data-val="${m}">${m}</button>`
      ).join('')}</div></div>
      <div class="gs-row"><label>时长</label><div class="gs-options">${brand.durations.map(d =>
        `<button class="gs-option${d===s.duration?' active':''}" data-field="duration" data-val="${d}">${d}</button>`
      ).join('')}</div></div>
      <div class="gs-row"><label>清晰度</label><div class="gs-options">${resolutions.map(r =>
        `<button class="gs-option${r===s.resolution?' active':''}" data-field="resolution" data-val="${r}">${r}</button>`
      ).join('')}</div></div>
      <div class="gs-row"><label>比例</label><div class="gs-options">${brand.ratios.map(r =>
        `<button class="gs-option${r===s.ratio?' active':''}" data-field="ratio" data-val="${r}">${r}</button>`
      ).join('')}</div></div>
      <div class="gs-row gs-toggle-row"><label>开启音效</label><span class="gs-toggle-hint">同时生成音效和视频</span>
        <label class="gs-toggle"><input type="checkbox" id="batchSoundToggle" ${s.soundEffect?'checked':''}><span class="gs-toggle-slider"></span></label>
      </div>`;
  }

  function renderTabs() {
    return GEN_SETTINGS.brands.map(b =>
      `<button class="gs-tab${b.key===s.brand?' active':''}" data-brand="${b.key}">${b.name}</button>`
    ).join('');
  }

  const creditCost = SHOT_DATA.length * 25;
  modal.innerHTML = `<div class="modal-content" style="max-width:520px;">
    <div class="modal-header" style="border-bottom:none;padding-bottom:0;">
      <div class="gs-tabs" id="batchGsTabs">${renderTabs()}</div>
      <button class="modal-close-btn" id="batchGsCloseBtn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal-body" style="padding-top:10px;" id="batchGsBody">${renderBody()}</div>
    <div class="modal-footer" style="justify-content:flex-end;">
      <button class="modal-btn apply-btn" id="batchGsConfirmBtn"><span class="gen-cost">${creditCost}</span>确认</button>
    </div>
  </div>`;

  function refreshContent() {
    document.getElementById('batchGsTabs').innerHTML = renderTabs();
    document.getElementById('batchGsBody').innerHTML = renderBody();
    bindInnerEvents();
  }

  function bindInnerEvents() {
    modal.querySelectorAll('.gs-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const key = this.getAttribute('data-brand');
        s.brand = key;
        const brand = getVideoBrand();
        s.model = brand.models[0]; s.duration = brand.durations[0]; s.ratio = brand.ratios[0];
        const res = getResolutions(brand, s.model);
        s.resolution = res[0];
        refreshContent();
      });
    });
    modal.querySelectorAll('.gs-option').forEach(opt => {
      opt.addEventListener('click', function() {
        const field = this.getAttribute('data-field');
        const val = this.getAttribute('data-val');
        s[field] = val;
        if (field === 'model') {
          const brand = getVideoBrand();
          const res = getResolutions(brand, val);
          if (!res.includes(s.resolution)) s.resolution = res[0];
        }
        refreshContent();
      });
    });
  }

  modal.querySelector('#batchGsCloseBtn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  modal.querySelector('#batchGsConfirmBtn').addEventListener('click', () => {
    const toggle = modal.querySelector('#batchSoundToggle');
    if (toggle) s.soundEffect = toggle.checked;
    showToast(`批量生成已提交：${SHOT_DATA.length}个分镜，${getVideoBrand().name} ${s.model} ${s.duration} ${s.resolution} ${s.ratio}`);
    modal.remove();
  });

  bindInnerEvents();
  document.body.appendChild(modal);
}

// ========== 预览操作 ==========
function initPreviewActions() {
  const subtitleEraseBtn = document.getElementById('subtitleEraseBtn');
  const videoCropBtn = document.getElementById('videoCropBtn');
  if (subtitleEraseBtn) {
    subtitleEraseBtn.addEventListener('click', () => {
      setTimeout(() => { addGenerationResult(); }, 2000);
    });
  }
  if (videoCropBtn) videoCropBtn.addEventListener('click', showCropModal);
  document.querySelectorAll('.preview-history-item').forEach((item) => {
    item.addEventListener('click', function() {
      const src = this.querySelector('img').src;
      selectPreviewHistory(this, src);
    });
  });
}

// ========== 视频剪裁浮窗 ==========
function buildCropFrameCells() {
  const thumbImages = [
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=60&h=34&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=60&h=34&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=60&h=34&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=60&h=34&fit=crop',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=60&h=34&fit=crop',
  ];
  let cells = '';
  for (let i = 0; i < 15; i++) cells += `<div class="crop-frame-cell"><img src="${thumbImages[i % thumbImages.length]}" alt="帧${i+1}"></div>`;
  return cells;
}

function buildCropTimelineHTML() {
  return `<div class="crop-timeline-area"><div class="crop-time-display"><span class="crop-current-time">0帧</span><span class="crop-time-sep"> / </span><span class="crop-duration-time">0.00秒</span></div>
    <div class="crop-track-row"><button class="crop-play-mini" id="cropPlayMini"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
    <div class="crop-track" id="cropTrack"><div class="crop-frames-strip">${buildCropFrameCells()}</div><div class="crop-range" id="cropRange"><div class="crop-handle crop-handle-start" id="cropHandleStart"></div><div class="crop-handle crop-handle-end" id="cropHandleEnd"></div><div class="crop-playhead" id="cropPlayhead"></div></div></div></div></div>`;
}

function showCropModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  const previewSrc = document.querySelector('.preview-box img')?.src || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop';
  modal.innerHTML = `<div class="modal-content crop-modal"><div class="modal-header"><h3>视频剪裁</h3><button class="modal-close-btn" id="cropCloseBtn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <div class="modal-body">
      <div class="crop-preview-area" style="width:100%;aspect-ratio:16/9;background:#000;border-radius:var(--radius-md);margin-bottom:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid var(--border);"><img src="${previewSrc}" style="max-width:100%;max-height:100%;object-fit:contain;" alt="预览"></div>
      ${buildCropTimelineHTML()}</div>
    <div class="modal-footer" style="justify-content:space-between;"><span class="crop-reset-text" id="cropResetBtn" style="color:var(--text-secondary);font-size:13px;cursor:pointer;">重置修改</span><button class="modal-btn apply-btn" id="cropApplyBtn">应用</button></div></div>`;
  document.body.appendChild(modal); injectModalStyles();
  modal.querySelector('#cropCloseBtn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  const shotDur = SHOT_DATA[state.currentShot - 1]?.duration || 5;
  initCropDrag(modal, shotDur);
}

function showVideoFrameModal(videoSrc, refName, replaceIndex) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  const previewSrc = videoSrc || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop';
  // Determine the source name from existing reference images
  if (!refName) {
    const ref = state.referenceImages.find(r => r.src === videoSrc);
    refName = ref ? ref.name : `分镜${state.currentShot}-视频1`;
  }
  let currentMode = 'frame';
  modal.innerHTML = `<div class="modal-content crop-modal"><div class="modal-header"><h3>视频素材选取</h3><button class="modal-close-btn" id="vfCloseBtn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <div class="modal-body">
      <div style="display:flex;gap:8px;margin-bottom:12px;"><button class="crop-btn vf-mode-btn active" data-mode="frame" style="flex:1;padding:8px;background:var(--primary);border:1px solid var(--primary);border-radius:var(--radius-sm);color:white;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;">选帧</button><button class="crop-btn vf-mode-btn" data-mode="segment" style="flex:1;padding:8px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-primary);font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;">选片段</button></div>
      <div class="crop-preview-area" style="width:100%;aspect-ratio:16/9;background:#000;border-radius:var(--radius-md);margin-bottom:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid var(--border);"><img src="${previewSrc}" style="max-width:100%;max-height:100%;object-fit:contain;" alt="预览"></div>
      ${buildCropTimelineHTML()}</div>
    <div class="modal-footer" style="justify-content:space-between;"><span class="crop-reset-text" id="cropResetBtn" style="color:var(--text-secondary);font-size:13px;cursor:pointer;">重置修改</span><button class="modal-btn apply-btn" id="cropApplyBtn">应用</button></div></div>`;
  document.body.appendChild(modal); injectModalStyles();
  modal.querySelector('#vfCloseBtn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  const modeBtns = modal.querySelectorAll('.vf-mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      modeBtns.forEach(b => { b.style.background='var(--bg-secondary)'; b.style.borderColor='var(--border)'; b.style.color='var(--text-primary)'; });
      this.style.background='var(--primary)'; this.style.borderColor='var(--primary)'; this.style.color='white';
      currentMode = this.getAttribute('data-mode');
    });
  });
  const shotDur = SHOT_DATA[state.currentShot - 1]?.duration || 5;
  const cropState = initCropDrag(modal, shotDur);
  // Override apply button for video frame modal
  const applyBtn = modal.querySelector('#cropApplyBtn');
  if (applyBtn) {
    applyBtn.onclick = null;
    applyBtn.addEventListener('click', () => {
      const { rs, re, pp, fmtTime, totalSec } = cropState;
      let name;
      let newType;
      
      if (currentMode === 'frame') {
        const frameNum = Math.round(pp * totalSec * 30);
        name = `${refName}-${frameNum}帧`;
        newType = 'image'; // 选帧应用 = 图片素材
      } else {
        name = `${refName}-${fmtTime(rs * totalSec)}-${fmtTime(re * totalSec)}`;
        newType = 'video'; // 选片段应用 = 视频素材
      }
      
      // 如果是替换模式，替换原有素材
      if (replaceIndex !== undefined && replaceIndex >= 0) {
        state.referenceImages[replaceIndex] = { src: previewSrc, type: newType, name };
        // 重新构建参考图堆叠区
        rebuildReferenceStack();
      } else {
        // 否则添加新素材
        addReferenceImage(previewSrc, newType, name);
      }
      
      modal.remove();
    });
  }
}

function initCropDrag(modal, totalSec) {
  totalSec = totalSec || 5;
  const track = modal.querySelector('#cropTrack'), range = modal.querySelector('#cropRange');
  const handleStart = modal.querySelector('#cropHandleStart'), handleEnd = modal.querySelector('#cropHandleEnd');
  const playhead = modal.querySelector('#cropPlayhead'), resetBtn = modal.querySelector('#cropResetBtn');
  const applyBtn = modal.querySelector('#cropApplyBtn');
  const playBtn = modal.querySelector('#cropPlayMini');
  if (!track || !range) return { rs: 0, re: 1, pp: 0, fmtTime: s => '00:00', totalSec };
  let dragging = null, dragOffset = 0;
  const pctFromX = (x) => { const r = track.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
  let rs = 0, re = 1, pp = 0;
  let playing = false, playRaf = null;
  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  function fmtFrameTime(sec) {
    const frames = Math.round(sec * 30);
    return `${frames}帧/${sec.toFixed(2)}秒`;
  }
  function update() {
    range.style.left = (rs*100)+'%'; range.style.width = ((re-rs)*100)+'%';
    const ppInRange = (re > rs) ? (pp - rs) / (re - rs) : 0;
    playhead.style.left = (ppInRange*100)+'%';
    const curTime = pp * totalSec;
    const clipDur = (re - rs) * totalSec;
    const ct = modal.querySelector('.crop-current-time'), dt = modal.querySelector('.crop-duration-time');
    // Show: current frame / selected range seconds
    if (ct) ct.textContent = `${Math.round(curTime * 30)}帧`;
    if (dt) dt.textContent = `${clipDur.toFixed(2)}秒`;
  }
  update();
  // Playback
  function stopPlay() {
    playing = false;
    if (playRaf) { cancelAnimationFrame(playRaf); playRaf = null; }
    if (playBtn) playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }
  function startPlay() {
    playing = true;
    if (playBtn) playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    const startPp = pp;
    const startTime = performance.now();
    const clipDurMs = (re - rs) * totalSec * 1000;
    const remainMs = (re - pp) * totalSec * 1000;
    function tick(now) {
      if (!playing) return;
      const elapsed = now - startTime;
      pp = startPp + (elapsed / 1000) / totalSec;
      if (pp >= re) { pp = re; update(); stopPlay(); return; }
      update();
      playRaf = requestAnimationFrame(tick);
    }
    playRaf = requestAnimationFrame(tick);
  }
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (playing) { stopPlay(); } else { if (pp >= re) pp = rs; startPlay(); }
    });
  }
  handleStart.addEventListener('mousedown', e => { e.preventDefault(); e.stopPropagation(); stopPlay(); dragging = 'start'; });
  handleEnd.addEventListener('mousedown', e => { e.preventDefault(); e.stopPropagation(); stopPlay(); dragging = 'end'; });
  playhead.addEventListener('mousedown', e => { e.preventDefault(); e.stopPropagation(); stopPlay(); dragging = 'playhead'; });
  range.addEventListener('mousedown', e => {
    if (e.target === handleStart || e.target === handleEnd || e.target === playhead) return;
    e.preventDefault(); stopPlay(); dragging = 'range';
    dragOffset = pctFromX(e.clientX) - rs;
  });
  const onMove = e => {
    if (!dragging) return; const p = pctFromX(e.clientX);
    if (dragging === 'start') { rs = Math.max(0, Math.min(p, re - 0.02)); if (pp < rs) pp = rs; }
    else if (dragging === 'end') { re = Math.min(1, Math.max(p, rs + 0.02)); if (pp > re) pp = re; }
    else if (dragging === 'playhead') { pp = Math.max(rs, Math.min(re, p)); }
    else if (dragging === 'range') {
      const w = re - rs; let newRs = p - dragOffset;
      newRs = Math.max(0, Math.min(newRs, 1 - w));
      const shift = newRs - rs; rs = newRs; re = rs + w; pp += shift;
      pp = Math.max(rs, Math.min(re, pp));
    }
    update();
  };
  const onUp = () => { dragging = null; };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  if (resetBtn) {
    resetBtn.addEventListener('mouseenter', function() { this.style.color='var(--primary)'; });
    resetBtn.addEventListener('mouseleave', function() { this.style.color=''; });
    resetBtn.addEventListener('click', () => { stopPlay(); rs=0; re=1; pp=0; update(); });
  }
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      stopPlay();
      const croppedDuration = (re - rs) * totalSec;
      // Save cropped duration to current shot
      const shotIdx = state.currentShot - 1;
      if (SHOT_DATA[shotIdx]) {
        SHOT_DATA[shotIdx].duration = Math.round(croppedDuration * 100) / 100;
        // Rebuild timeline to reflect new duration
        if (state.currentView === 'timeline') {
          buildTimelineShots();
          initPlayhead();
          selectShot(shotIdx);
        }
      }
      modal.remove();
    });
  }
  const observer = new MutationObserver(() => {
    if (!document.body.contains(modal)) {
      stopPlay();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });
  // Return state accessor for external use
  const stateRef = { get rs() { return rs; }, get re() { return re; }, get pp() { return pp; }, fmtTime, fmtFrameTime, totalSec };
  return stateRef;
}

function injectModalStyles() {
  if (document.getElementById('modal-styles')) return;
  const s = document.createElement('style'); s.id = 'modal-styles';
  s.textContent = `.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s;}
.modal-content{background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:560px;width:90%;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;animation:slideUp 0.3s;}
@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-header{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.modal-header h3{color:var(--text-primary);font-size:16px;font-weight:600;margin:0;}
.modal-close-btn{width:30px;height:30px;background:transparent;border:none;color:var(--text-secondary);cursor:pointer;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
.modal-close-btn:hover{background:var(--bg-tertiary);color:var(--primary);}
.modal-body{padding:18px;overflow-y:auto;flex:1;}
.crop-timeline-area{background:var(--bg-tertiary);padding:14px;border-radius:var(--radius-md);}
.crop-time-display{text-align:center;color:var(--text-primary);font-family:'Courier New',monospace;font-size:14px;margin-bottom:10px;}
.crop-track-row{display:flex;align-items:center;gap:8px;}
.crop-play-mini{width:28px;height:28px;background:var(--primary);border:none;border-radius:50%;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;box-shadow:var(--shadow-glow);}
.crop-play-mini:hover{background:var(--primary-hover);transform:scale(1.1);}
.crop-track{flex:1;height:40px;background:var(--bg-secondary);border-radius:var(--radius-sm);position:relative;overflow:visible;}
.crop-frames-strip{display:flex;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;border-radius:var(--radius-sm);}
.crop-frame-cell{flex:1;overflow:hidden;border-right:1px solid rgba(255,255,255,0.05);}
.crop-frame-cell img{width:100%;height:100%;object-fit:cover;opacity:0.6;}
.crop-range{position:absolute;top:-2px;left:0;width:100%;height:calc(100% + 4px);border:2px solid var(--primary);border-radius:4px;z-index:5;box-sizing:border-box;cursor:grab;}
.crop-range:active{cursor:grabbing;}
.crop-handle{position:absolute;top:50%;transform:translateY(-50%);width:10px;height:26px;background:var(--primary);border-radius:3px;cursor:ew-resize;z-index:6;}
.crop-handle-start{left:-5px;}.crop-handle-end{right:-5px;}
.crop-playhead{position:absolute;top:-2px;bottom:-2px;width:2px;background:white;z-index:10;left:0;cursor:ew-resize;pointer-events:auto;}
.crop-playhead::before{content:'';position:absolute;top:-3px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:white;border-radius:50%;}
.modal-footer{padding:14px 18px;border-top:1px solid var(--border);display:flex;gap:10px;align-items:center;}
.modal-btn{padding:8px 18px;border-radius:var(--radius-sm);font-size:13px;cursor:pointer;transition:all 0.2s;border:none;}
.apply-btn{background:var(--primary);color:white;box-shadow:var(--shadow-glow);}
.apply-btn:hover{background:var(--primary-hover);}`;
  document.head.appendChild(s);
}

function injectGenSettingsStyles() {
  if (document.getElementById('gen-settings-styles')) return;
  const s = document.createElement('style'); s.id = 'gen-settings-styles';
  s.textContent = `
/* 旁白音色弹窗 */
.voice-filters{margin-bottom:14px;display:flex;flex-direction:column;gap:8px;}
.voice-filter-group{display:flex;align-items:center;gap:8px;}
.voice-filter-group label{font-size:12px;color:var(--text-secondary);white-space:nowrap;min-width:32px;}
.voice-filter-options{display:flex;gap:4px;flex-wrap:wrap;}
.voice-filter-btn{padding:4px 10px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:20px;color:var(--text-secondary);font-size:11px;cursor:pointer;transition:all 0.2s;}
.voice-filter-btn:hover{border-color:var(--primary);color:var(--primary);}
.voice-filter-btn.active{background:var(--primary);border-color:var(--primary);color:white;}
.voice-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-height:320px;overflow-y:auto;}
.voice-grid::-webkit-scrollbar{width:4px;}
.voice-grid::-webkit-scrollbar-thumb{background:var(--bg-tertiary);border-radius:2px;}
.voice-grid-item{display:flex;align-items:center;gap:4px;padding:8px 6px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:11px;cursor:pointer;transition:all 0.2s;white-space:nowrap;overflow:hidden;}
.voice-grid-item svg{flex-shrink:0;width:12px;height:12px;}
.voice-grid-item span{overflow:hidden;text-overflow:ellipsis;}
.voice-grid-item:hover{border-color:var(--primary);color:var(--primary);}
.voice-grid-item.active{background:var(--primary);border-color:var(--primary);color:white;}
/* 生成设置弹窗 */
.gs-tabs{display:flex;gap:0;}
.gs-tab{padding:10px 18px;background:transparent;border:none;color:var(--text-secondary);font-size:14px;cursor:pointer;position:relative;transition:all 0.2s;}
.gs-tab:hover{color:var(--text-primary);}
.gs-tab.active{color:var(--primary);}
.gs-tab.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--primary);}
.gs-brand-desc{margin-bottom:16px;}
.gs-brand-desc strong{font-size:14px;color:var(--text-primary);}
.gs-brand-desc p{font-size:12px;color:var(--text-secondary);margin-top:4px;line-height:1.5;}
.gs-row{display:flex;align-items:flex-start;gap:16px;margin-bottom:14px;}
.gs-row>label{font-size:13px;color:var(--text-secondary);white-space:nowrap;min-width:56px;padding-top:7px;}
.gs-options{display:flex;flex-wrap:wrap;gap:6px;flex:1;}
.gs-option{padding:7px 14px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:12px;cursor:pointer;transition:all 0.2s;}
.gs-option:hover{border-color:var(--primary);color:var(--primary);}
.gs-option.active{background:rgba(255,107,157,0.15);border-color:var(--primary);color:var(--primary);}
.gs-toggle-row{align-items:center;}
.gs-toggle-hint{flex:1;font-size:12px;color:var(--text-muted);}
.gs-toggle{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
.gs-toggle input{opacity:0;width:0;height:0;}
.gs-toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:11px;transition:0.3s;}
.gs-toggle-slider::before{content:'';position:absolute;height:16px;width:16px;left:2px;bottom:2px;background:white;border-radius:50%;transition:0.3s;}
.gs-toggle input:checked+.gs-toggle-slider{background:var(--primary);border-color:var(--primary);}
.gs-toggle input:checked+.gs-toggle-slider::before{transform:translateX(18px);}
/* @ mention dropdown */
.at-mention-dropdown{position:fixed;background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius-md);padding:4px;box-shadow:var(--shadow-lg);z-index:10001;max-height:150px;overflow-y:auto;}
.at-mention-title{font-size:10px;color:var(--text-muted);padding:2px 6px 4px;}
.at-mention-item{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:var(--radius-sm);cursor:pointer;transition:background 0.15s;}
.at-mention-item:hover{background:var(--bg-tertiary);}
.at-mention-item img{width:24px;height:24px;border-radius:4px;object-fit:cover;flex-shrink:0;}
.at-mention-item span{font-size:12px;color:var(--text-primary);}
`;
  document.head.appendChild(s);
}

// ========== 资产库 ==========
function initAssetTabs() {
  const tabs = document.querySelectorAll('.asset-tab');
  const contents = document.querySelectorAll('.asset-tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const name = this.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active')); this.classList.add('active');
      contents.forEach(c => { c.classList.toggle('active', c.getAttribute('data-content') === name); });
    });
  });
}

function initAssetReference() {
  document.querySelectorAll('.asset-ref-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const item = this.closest('.asset-item');
      const src = item.getAttribute('data-asset-src') || item.querySelector('img').src;
      if (src) { addReferenceImage(src, 'image'); }
    });
  });
}

function initAssetEdit() {
  document.querySelectorAll('.asset-edit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
}

// ========== 素材合集展开/收起 ==========
const COLLECTION_DATA = {
  char1: [
    {src:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',alt:'正面'},
    {src:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',alt:'侧面'},
    {src:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop',alt:'全身'},
    {src:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=200&fit=crop',alt:'特写'}
  ],
  char2: [
    {src:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',alt:'正面'},
    {src:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',alt:'侧面'},
    {src:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop',alt:'全身'}
  ],
  char3: [
    {src:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',alt:'正面'},
    {src:'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop',alt:'侧面'}
  ],
  char4: [
    {src:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',alt:'正面'},
    {src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',alt:'全身'}
  ],
  scene1: [
    {src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',alt:'全景'},
    {src:'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=200&fit=crop',alt:'近景'},
    {src:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop',alt:'窗边'}
  ],
  scene2: [
    {src:'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=200&fit=crop',alt:'内景'},
    {src:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=200&fit=crop',alt:'外景'}
  ]
};

function initAssetCollections() {
  document.querySelectorAll('.asset-collection').forEach(collection => {
    const cover = collection.querySelector('.collection-cover');
    if (!cover) return;
    cover.addEventListener('click', function() {
      const isExpanded = collection.classList.contains('expanded');
      // Close all other expanded collections in the same list
      const list = collection.closest('.asset-collection-list');
      collapseAllCollections(list);
      if (isExpanded) return;
      // Expand: hide cover, show items grid in its place
      collection.classList.add('expanded');
      const collectionId = collection.getAttribute('data-collection');
      const items = COLLECTION_DATA[collectionId];
      if (!items || !items.length) return;
      const label = cover.querySelector('.collection-label');
      const name = label ? label.childNodes[0].textContent.trim() : collectionId;
      const grid = document.createElement('div');
      grid.className = 'collection-expanded-grid';
      // Back button to collapse
      const backBtn = document.createElement('button');
      backBtn.className = 'collection-back-btn';
      backBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>${name}`;
      backBtn.addEventListener('click', () => collapseAllCollections(list));
      grid.appendChild(backBtn);
      items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'collection-expanded-item';
        el.setAttribute('data-asset-src', item.src);
        el.setAttribute('data-asset-name', name + '-' + (item.alt || ''));
        el.innerHTML = `<img src="${item.src}" alt="${item.alt || ''}">
          <div class="asset-item-actions"><button class="asset-ref-btn">引用</button><button class="asset-edit-btn">编辑</button></div>`;
        grid.appendChild(el);
      });
      collection.after(grid);
      // Bind ref/edit buttons
      grid.querySelectorAll('.asset-ref-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const item = this.closest('.collection-expanded-item');
          const src = item.getAttribute('data-asset-src');
          const assetName = item.getAttribute('data-asset-name');
          if (src) { addReferenceImage(src, 'image', assetName); }
        });
      });
      grid.querySelectorAll('.asset-edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) { e.stopPropagation(); });
      });
    });
  });
}

function collapseAllCollections(list) {
  if (!list) return;
  list.querySelectorAll('.asset-collection.expanded').forEach(c => {
    c.classList.remove('expanded');
    const grid = c.nextElementSibling;
    if (grid && grid.classList.contains('collection-expanded-grid')) grid.remove();
  });
}

function initHistoryActions() {
  document.querySelectorAll('.history-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const action = this.getAttribute('data-action');
      const card = this.closest('.history-card');
      const src = card.querySelector('img').src;
      if (action === 'reference') { addReferenceImage(src, 'video'); }
      else if (action === 'download') { downloadImage(src); }
    });
  });
}

function downloadImage(url) {
  const link = document.createElement('a');
  link.href = url; link.download = 'shot_' + Date.now() + '.jpg';
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// ========== 构建时间轴分镜 ==========
function buildTimelineShots() {
  const container = document.querySelector('.timeline-shots');
  if (!container) return;
  container.innerHTML = '';
  // Calculate total duration and update state
  const totalDuration = SHOT_DATA.reduce((sum, s) => sum + (s.duration || 5), 0);
  state.totalTime = totalDuration;
  const totalTimeEl = document.querySelector('.total-time');
  if (totalTimeEl) {
    const m = Math.floor(totalDuration / 60), s = totalDuration % 60;
    totalTimeEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  // Add trigger before first shot
  const trigBefore = document.createElement('div');
  trigBefore.className = 'add-shot-trigger';
  trigBefore.innerHTML = `<button class="add-shot-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>`;
  trigBefore.addEventListener('click', () => {
    const newShot = { id: 0, img: '', text: '', duration: 2, history: [] };
    SHOT_DATA.splice(0, 0, newShot);
    renumberShots();
    buildTimelineShots();
    initPlayhead();
    selectShot(0);
  });
  container.appendChild(trigBefore);

  SHOT_DATA.forEach((shot, i) => {
    if (i > 0) {
      const trigger = document.createElement('div');
      trigger.className = 'add-shot-trigger';
      trigger.innerHTML = `<button class="add-shot-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>`;
      trigger.addEventListener('click', () => insertShotAfter(i - 1));
      container.appendChild(trigger);
    }
    const dur = shot.duration || 5;
    const el = document.createElement('div');
    el.className = 'timeline-shot' + (i === 0 ? ' active' : '');
    el.setAttribute('data-shot', shot.id);
    const thumbContent = shot.img
      ? `<div class="shot-thumb"><img src="${shot.img}" alt="分镜${shot.id}"></div>`
      : `<div class="shot-thumb"><div class="shot-thumb-placeholder"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div></div>`;
    el.innerHTML = `
      ${thumbContent}
      <span class="shot-label">分镜${shot.id}</span>
      <div class="shot-info">
        <span class="shot-duration">${dur}s</span>
        <button class="shot-action-btn copy"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
        <button class="shot-action-btn delete"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>
      </div>`;
    container.appendChild(el);
  });

  // Add trigger after last shot
  const trigAfter = document.createElement('div');
  trigAfter.className = 'add-shot-trigger';
  trigAfter.innerHTML = `<button class="add-shot-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>`;
  trigAfter.addEventListener('click', () => insertShotAfter(SHOT_DATA.length - 1));
  container.appendChild(trigAfter);

  initTimelineShots();
}

function insertShotAfter(index) {
  const newShot = { id: 0, img: '', text: '', duration: 2, history: [] };
  SHOT_DATA.splice(index + 1, 0, newShot);
  renumberShots();
  buildTimelineShots();
  initPlayhead();
  // Select the new shot
  selectShot(index + 1);
}

function renumberShots() {
  SHOT_DATA.forEach((shot, i) => { shot.id = i + 1; });
}

// ========== 时间轴 ==========
function initTimeline() {
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      state.isPlaying = !state.isPlaying;
      this.innerHTML = state.isPlaying
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      if (state.isPlaying) startPlayback(); else stopPlayback();
    });
  }
  initPlayhead();
}

let playbackInterval = null;

function initPlayhead() {
  const playhead = document.getElementById('timelinePlayhead');
  const timelineContent = document.getElementById('timelineContent');
  if (!playhead || !timelineContent) return;
  let isDragging = false;

  function timeFromX(x) {
    // Convert pixel position to time using per-shot durations
    const shots = timelineContent.querySelectorAll('.timeline-shot');
    let cumTime = 0;
    for (let i = 0; i < shots.length; i++) {
      const shotEl = shots[i];
      const dur = SHOT_DATA[i]?.duration || 5;
      if (x <= shotEl.offsetLeft + shotEl.offsetWidth) {
        const frac = Math.max(0, (x - shotEl.offsetLeft) / shotEl.offsetWidth);
        return cumTime + frac * dur;
      }
      cumTime += dur;
    }
    return state.totalTime;
  }

  playhead.addEventListener('mousedown', e => { isDragging = true; e.preventDefault(); });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const rect = timelineContent.getBoundingClientRect();
    const sc = timelineContent.querySelector('.timeline-shots');
    if (!sc) return;
    let x = e.clientX - rect.left + timelineContent.scrollLeft;
    x = Math.max(0, Math.min(x, sc.scrollWidth));
    playhead.style.left = x + 'px'; playhead.style.transition = 'none';
    state.currentTime = Math.round(timeFromX(x));
    updateTimeDisplay();
    syncPreviewToPlayhead();
  });
  document.addEventListener('mouseup', () => { if (isDragging) { isDragging = false; playhead.style.transition = 'left 0.05s linear'; } });
  timelineContent.addEventListener('click', e => {
    if (e.target.closest('.timeline-shot') || e.target.closest('.add-shot-trigger')) return;
    const rect = timelineContent.getBoundingClientRect();
    const sc = timelineContent.querySelector('.timeline-shots');
    if (!sc) return;
    let x = e.clientX - rect.left + timelineContent.scrollLeft;
    x = Math.max(0, Math.min(x, sc.scrollWidth));
    playhead.style.left = x + 'px';
    state.currentTime = Math.round(timeFromX(x));
    updateTimeDisplay();
    syncPreviewToPlayhead();
  });
}

function startPlayback() {
  const playhead = document.getElementById('timelinePlayhead');
  const tc = document.getElementById('timelineContent');
  if (!playhead || !tc) return;
  const sc = tc.querySelector('.timeline-shots'); if (!sc) return;
  const totalDuration = SHOT_DATA.reduce((sum, s) => sum + (s.duration || 5), 0);
  state.totalTime = totalDuration;
  const tw = sc.scrollWidth;
  const td = totalDuration * 1000;
  const sp = state.currentTime / totalDuration;
  const st = performance.now() - (sp * td);
  playbackInterval = requestAnimationFrame(function anim(now) {
    if (!state.isPlaying) return;
    const elapsed = now - st;
    const timeSec = Math.min(elapsed / 1000, totalDuration);
    // Map time to pixel position using per-shot durations
    const shots = tc.querySelectorAll('.timeline-shot');
    let cumTime = 0, x = 0;
    for (let i = 0; i < SHOT_DATA.length; i++) {
      const dur = SHOT_DATA[i].duration || 5;
      const shotEl = shots[i];
      if (!shotEl) break;
      if (timeSec <= cumTime + dur) {
        const frac = (timeSec - cumTime) / dur;
        x = shotEl.offsetLeft + frac * shotEl.offsetWidth;
        break;
      }
      cumTime += dur;
      if (i === SHOT_DATA.length - 1) x = shotEl.offsetLeft + shotEl.offsetWidth;
    }
    playhead.style.left = x + 'px';
    state.currentTime = Math.round(timeSec);
    updateTimeDisplay();
    syncPreviewToPlayhead();
    const cr = tc.getBoundingClientRect();
    if (x - tc.scrollLeft > cr.width - 50) tc.scrollLeft = x - cr.width + 100;
    if (timeSec < totalDuration) playbackInterval = requestAnimationFrame(anim);
    else {
      state.isPlaying = false; state.currentTime = 0; playhead.style.left = '0px'; updateTimeDisplay();
      document.getElementById('playBtn').innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    }
  });
}

function stopPlayback() { if (playbackInterval) { cancelAnimationFrame(playbackInterval); playbackInterval = null; } }

function updateTimeDisplay() {
  const el = document.getElementById('currentTimeDisplay');
  if (el) { const m = Math.floor(state.currentTime/60), s = state.currentTime%60; el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
}

function initTimelineShots() {
  document.querySelectorAll('.timeline-shot').forEach((shot, i) => {
    shot.addEventListener('click', function() {
      document.querySelectorAll('.timeline-shot').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      selectShot(i);
    });
    shot.querySelector('.copy')?.addEventListener('click', e => { e.stopPropagation(); });
    shot.querySelector('.delete')?.addEventListener('click', e => {
      e.stopPropagation();
      if (SHOT_DATA.length <= 1) { showToast('至少保留一个分镜'); return; }
      if (confirm('确定要删除这个分镜吗？')) {
        SHOT_DATA.splice(i, 1);
        renumberShots();
        buildTimelineShots();
        initPlayhead();
        // Select first shot if current was deleted
        const newIdx = Math.min(i, SHOT_DATA.length - 1);
        selectShot(newIdx);
      }
    });
  });
  initTimelineDragSort();
}

// ========== 时间轴拖拽排序 ==========
function initTimelineDragSort() {
  const shots = document.querySelectorAll('.timeline-shot');
  let draggedElement = null;
  let draggedIndex = -1;

  shots.forEach((shot, index) => {
    shot.setAttribute('draggable', 'true');
    shot.style.cursor = 'move';

    shot.addEventListener('dragstart', function(e) {
      draggedElement = this;
      draggedIndex = index;
      this.style.opacity = '0.5';
      e.dataTransfer.effectAllowed = 'move';
    });

    shot.addEventListener('dragend', function(e) {
      this.style.opacity = '';
      shots.forEach(s => s.classList.remove('drag-over'));
    });

    shot.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (this !== draggedElement) {
        this.classList.add('drag-over');
      }
    });

    shot.addEventListener('dragleave', function(e) {
      this.classList.remove('drag-over');
    });

    shot.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      
      if (this !== draggedElement) {
        const dropIndex = Array.from(shots).indexOf(this);
        // Reorder SHOT_DATA
        const [movedShot] = SHOT_DATA.splice(draggedIndex, 1);
        SHOT_DATA.splice(dropIndex, 0, movedShot);
        renumberShots();
        // Rebuild timeline
        buildTimelineShots();
        initPlayhead();
        // Keep the moved shot selected
        selectShot(dropIndex);
      }
    });
  });
}

// ========== 故事板切换 ==========
function initStoryboardSwitch() {
  const switchBtn = document.getElementById('switchViewBtn');
  const mainContent = document.querySelector('.main-content');
  const timelineContent = document.getElementById('timelineContent');
  if (!switchBtn || !timelineContent) return;

  switchBtn.addEventListener('click', function() {
    const genContainer = document.getElementById('generationContainer');
    const bottomLeftSpacer = document.querySelector('.bottom-left-spacer');
    const shotPanelContainer = document.querySelector('.shot-panel-container');
    if (state.currentView === 'timeline') {
      state.currentView = 'storyboard';
      this.textContent = '切换默认视图';
      mainContent.classList.add('storyboard-mode');
      // Move generation area into shot-panel-container for storyboard mode
      if (genContainer && shotPanelContainer) shotPanelContainer.appendChild(genContainer);
      stopPlayback(); state.isPlaying = false;
      timelineContent.innerHTML = createStoryboardView();
      initStoryboardInteractions();
    } else {
      state.currentView = 'timeline';
      this.textContent = '切换故事板';
      mainContent.classList.remove('storyboard-mode');
      // Move generation area back to bottom-left-spacer
      if (genContainer && bottomLeftSpacer) bottomLeftSpacer.appendChild(genContainer);
      timelineContent.innerHTML = '';
      const ph = document.createElement('div');
      ph.className = 'timeline-playhead'; ph.id = 'timelinePlayhead';
      timelineContent.appendChild(ph);
      const sd = document.createElement('div');
      sd.className = 'timeline-shots'; timelineContent.appendChild(sd);
      buildTimelineShots(); initPlayhead();
    }
  });
}

function createStoryboardView() {
  let html = '<div class="storyboard-grid">';
  SHOT_DATA.forEach((shot, i) => {
    const text = shot.text || '';
    const thumbContent = shot.img
      ? `<div class="storyboard-thumb"><img src="${shot.img}" alt="分镜${shot.id}"></div>`
      : `<div class="storyboard-thumb"><div class="storyboard-thumb-placeholder"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div></div>`;
    html += `<div class="storyboard-card" data-shot="${shot.id}" data-index="${i}">
      ${thumbContent}
      <span class="storyboard-label">分镜${shot.id}</span>
      <div class="storyboard-overlay"><div class="storyboard-text">${text}</div>
      <div class="storyboard-overlay-actions">
        <button class="storyboard-edit-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="storyboard-delete-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>
      </div></div></div>`;
  });
  html += '</div>';
  return html;
}

function positionStoryboardAddTriggers() {
  // Remove old triggers
  document.querySelectorAll('.storyboard-add-trigger').forEach(t => t.remove());
  const grid = document.querySelector('.storyboard-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.storyboard-card');
  if (cards.length === 0) return;

  function makeTrigger(afterIndex) {
    const trigger = document.createElement('div');
    trigger.className = 'storyboard-add-trigger';
    trigger.setAttribute('data-after', afterIndex);
    trigger.innerHTML = `<button class="storyboard-add-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>`;
    return trigger;
  }

  // Trigger before the first card (data-after = -1 means insert at index 0)
  const firstCard = cards[0];
  const trigBefore = makeTrigger(-1);
  trigBefore.style.left = (firstCard.offsetLeft - 12) + 'px';
  trigBefore.style.top = (firstCard.offsetTop + firstCard.offsetHeight / 2 - 12) + 'px';
  grid.appendChild(trigBefore);

  // Triggers between cards
  for (let i = 0; i < cards.length - 1; i++) {
    const card = cards[i];
    const nextCard = cards[i + 1];
    const sameRow = Math.abs(card.offsetTop - nextCard.offsetTop) < 5;
    const trigger = makeTrigger(i);

    if (sameRow) {
      const gap = nextCard.offsetLeft - (card.offsetLeft + card.offsetWidth);
      trigger.style.left = (card.offsetLeft + card.offsetWidth + gap / 2 - 12) + 'px';
      trigger.style.top = (card.offsetTop + card.offsetHeight / 2 - 12) + 'px';
      grid.appendChild(trigger);
    } else {
      // Cross-row: put one at the right side of current row's last card
      const trigRight = makeTrigger(i);
      trigRight.style.left = (card.offsetLeft + card.offsetWidth + 2) + 'px';
      trigRight.style.top = (card.offsetTop + card.offsetHeight / 2 - 12) + 'px';
      grid.appendChild(trigRight);

      // And one at the left side of next row's first card
      const trigLeft = makeTrigger(i);
      trigLeft.style.left = (nextCard.offsetLeft - 12) + 'px';
      trigLeft.style.top = (nextCard.offsetTop + nextCard.offsetHeight / 2 - 12) + 'px';
      grid.appendChild(trigLeft);
    }
  }

  // Trigger after the last card
  const lastCard = cards[cards.length - 1];
  const trigAfter = makeTrigger(cards.length - 1);
  trigAfter.style.left = (lastCard.offsetLeft + lastCard.offsetWidth + 2) + 'px';
  trigAfter.style.top = (lastCard.offsetTop + lastCard.offsetHeight / 2 - 12) + 'px';
  grid.appendChild(trigAfter);
}

function initStoryboardInteractions() {
  document.querySelectorAll('.storyboard-card').forEach(card => {
    card.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-index'));
      selectShot(idx);
      // Highlight in storyboard
      document.querySelectorAll('.storyboard-card').forEach(c => c.style.borderColor = '');
      this.style.borderColor = 'var(--primary)';
    });
  });
  // Delete buttons
  document.querySelectorAll('.storyboard-delete-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (SHOT_DATA.length <= 1) { showToast('至少保留一个分镜'); return; }
      const card = this.closest('.storyboard-card');
      const idx = parseInt(card.getAttribute('data-index'));
      if (confirm('确定要删除这个分镜吗？')) {
        SHOT_DATA.splice(idx, 1);
        renumberShots();
        const newIdx = Math.min(idx, SHOT_DATA.length - 1);
        selectShot(newIdx);
        const tc = document.getElementById('timelineContent');
        if (tc) { tc.innerHTML = createStoryboardView(); initStoryboardInteractions(); }
      }
    });
  });
  document.querySelectorAll('.storyboard-edit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.storyboard-card');
      const textEl = card.querySelector('.storyboard-text');
      if (!textEl || textEl.style.display === 'none') return;
      const overlay = card.querySelector('.storyboard-overlay');
      const shotIdx = parseInt(card.getAttribute('data-index'));
      // Create inline textarea
      const textarea = document.createElement('textarea');
      textarea.className = 'storyboard-text-edit';
      textarea.value = textEl.textContent;
      textEl.style.display = 'none';
      overlay.insertBefore(textarea, textEl.nextSibling);
      // Keep overlay visible during editing
      overlay.style.opacity = '1';
      textarea.focus();
      const saveEdit = () => {
        textEl.textContent = textarea.value;
        textEl.style.display = '';
        textarea.remove();
        overlay.style.opacity = '';
        // Save back to SHOT_DATA
        if (SHOT_DATA[shotIdx]) SHOT_DATA[shotIdx].text = textarea.value;
        // If this is the currently selected shot, update left panel too
        if (state.currentShot === shotIdx + 1) {
          const tc = document.getElementById('shotTextContent');
          if (tc) tc.textContent = textarea.value;
        }
      };
      textarea.addEventListener('blur', saveEdit);
      textarea.addEventListener('keydown', ev => {
        ev.stopPropagation();
        if (ev.ctrlKey && ev.key === 'Enter') saveEdit();
      });
      textarea.addEventListener('click', ev => ev.stopPropagation());
    });
  });
  // Position add triggers as overlays after cards are rendered
  requestAnimationFrame(() => {
    positionStoryboardAddTriggers();
    // Bind click events on triggers
    document.querySelectorAll('.storyboard-add-trigger').forEach(trigger => {
      trigger.querySelector('.storyboard-add-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const afterIndex = parseInt(trigger.getAttribute('data-after'));
        if (afterIndex === -1) {
          // Insert before the first shot
          const newShot = { id: 0, img: '', text: '', duration: 2, history: [] };
          SHOT_DATA.splice(0, 0, newShot);
          renumberShots();
          buildTimelineShots();
          initPlayhead();
          selectShot(0);
        } else {
          insertShotAfter(afterIndex);
        }
        const tc = document.getElementById('timelineContent');
        if (tc) { tc.innerHTML = createStoryboardView(); initStoryboardInteractions(); }
      });
    });
  });
  initStoryboardDragSort();
}

// ========== 故事板拖拽排序 ==========
function initStoryboardDragSort() {
  const cards = document.querySelectorAll('.storyboard-card');
  let draggedElement = null;
  let draggedIndex = -1;

  cards.forEach((card, index) => {
    card.setAttribute('draggable', 'true');
    card.style.cursor = 'move';

    card.addEventListener('dragstart', function(e) {
      draggedElement = this;
      draggedIndex = index;
      this.style.opacity = '0.5';
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', function(e) {
      this.style.opacity = '';
      cards.forEach(c => c.classList.remove('drag-over'));
    });

    card.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (this !== draggedElement) {
        this.classList.add('drag-over');
      }
    });

    card.addEventListener('dragleave', function(e) {
      this.classList.remove('drag-over');
    });

    card.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      
      if (this !== draggedElement) {
        const dropIndex = Array.from(cards).indexOf(this);
        // Reorder SHOT_DATA
        const [movedShot] = SHOT_DATA.splice(draggedIndex, 1);
        SHOT_DATA.splice(dropIndex, 0, movedShot);
        renumberShots();
        // Rebuild storyboard
        const tc = document.getElementById('timelineContent');
        if (tc) { 
          tc.innerHTML = createStoryboardView(); 
          initStoryboardInteractions(); 
        }
        // Keep the moved shot selected
        selectShot(dropIndex);
      }
    });
  });
}

// ========== 键盘快捷键 ==========
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.isContentEditable || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') {
      e.preventDefault(); document.getElementById('playBtn')?.click();
    }
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault(); document.querySelector('.generate-btn')?.click();
    }
  });
}

// ========== Toast ==========
function showToast(message) {
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-message'; toast.textContent = message;
  toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-60px);background:rgba(0,0,0,0.9);color:white;padding:10px 20px;border-radius:var(--radius-md);font-size:13px;z-index:10000;opacity:0;transition:all 0.3s;border:1px solid var(--primary);box-shadow:0 0 20px var(--primary-glow);';
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; toast.style.opacity = '1'; }, 10);
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(-60px)'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
}

// ========== 动画 ==========
const animStyle = document.createElement('style');
animStyle.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(animStyle);
