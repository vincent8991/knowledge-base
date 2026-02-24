// 知识库应用 - 核心逻辑
// 使用 LocalStorage 存储数据

// ========== 数据模型 ==========
const DB_KEYS = {
    reports: 'kb_reports',
    sources: 'kb_sources',
    tags: 'kb_tags',
    lastUpdate: 'kb_lastUpdate'
};

// 初始化数据
function initializeData() {
    if (!localStorage.getItem(DB_KEYS.reports)) {
        localStorage.setItem(DB_KEYS.reports, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.sources)) {
        localStorage.setItem(DB_KEYS.sources, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.tags)) {
        localStorage.setItem(DB_KEYS.tags, JSON.stringify(getDefaultTags()));
    }
    
    // 迁移旧数据（如果存在）
    migrateOldData();
    
    // 迁移信息源数据（添加category字段）
    migrateSourcesCategory();
}

// 迁移信息源数据，添加category字段
function migrateSourcesCategory() {
    const sources = getSources();
    let needsUpdate = false;
    
    sources.forEach(source => {
        if (!source.category) {
            // 根据type推断category
            if (source.type === 'ai' || source.type === 'tech' || source.type === 'official') {
                source.category = 'ai';
            } else {
                source.category = 'invest';
            }
            needsUpdate = true;
        }
    });
    
    if (needsUpdate) {
        saveSources(sources);
    }
}

// 获取默认标签
function getDefaultTags() {
    return [
        { id: 'ai-chip', name: 'AI芯片', color: 'blue' },
        { id: 'display', name: '显示面板', color: 'green' },
        { id: 'consumer', name: '消费电子', color: 'purple' },
        { id: 'cycle', name: '周期股', color: 'orange' },
        { id: 'strategy', name: '策略研究', color: 'red' },
        { id: 'export', name: '出口链', color: 'gray' }
    ];
}

// 迁移旧数据（从原始HTML提取的数据）
function migrateOldData() {
    const reports = getReports();
    if (reports.length === 0) {
        // 添加示例数据
        const defaultReports = [
            {
                id: generateId(),
                title: '京东方A (000725.SZ)',
                type: 'buy',
                tags: ['display', 'cycle'],
                currentPrice: '4.18元',
                targetPrice: '5.0-5.5元',
                content: `
                    <h3>投资逻辑</h3>
                    <p>LCD现金牛 + OLED成长性，2026年折旧下行通道</p>
                    
                    <h3>核心观点</h3>
                    <ul>
                        <li>LCD周期复苏，价格企稳回升</li>
                        <li>OLED在车载、VR等新场景渗透</li>
                        <li>2026年折旧大幅下降，利润释放</li>
                        <li>成都、重庆产线折旧逐步完成</li>
                    </ul>
                    
                    <h3>风险因素</h3>
                    <ul>
                        <li>面板价格波动</li>
                        <li>OLED渗透不及预期</li>
                        <li>行业产能过剩</li>
                    </ul>
                `,
                createdAt: '2026-02-21',
                updatedAt: '2026-02-21'
            },
            {
                id: generateId(),
                title: '泡泡玛特 (9992.HK)',
                type: 'buy',
                tags: ['consumer'],
                currentPrice: '85港元',
                targetPrice: '110港元',
                content: `
                    <h3>投资逻辑</h3>
                    <p>IP生态 + 全球化，潮玩行业龙头</p>
                    
                    <h3>核心观点</h3>
                    <ul>
                        <li>头部IP持续爆款（Molly、Dimoo）</li>
                        <li>海外扩张加速，东南亚、欧美市场</li>
                        <li>乐园业务带来新增长点</li>
                        <li>会员体系提升复购率</li>
                    </ul>
                    
                    <h3>风险因素</h3>
                    <ul>
                        <li>IP老化风险</li>
                        <li>海外扩张不及预期</li>
                        <li>竞争加剧</li>
                    </ul>
                `,
                createdAt: '2026-02-21',
                updatedAt: '2026-02-21'
            },
            {
                id: generateId(),
                title: 'Taalas芯片深度报告',
                type: 'watch',
                tags: ['ai-chip', 'strategy'],
                currentPrice: '-',
                targetPrice: '-',
                content: `
                    <h3>投资逻辑</h3>
                    <p>ASIC AI推理芯片叙事 - 模型固化至硅片</p>
                    
                    <h3>核心技术</h3>
                    <ul>
                        <li>硬连线（Hard-wiring）技术</li>
                        <li>性能：17,000 tokens/s（Llama 3.1 8B）</li>
                        <li>成本：1/20 传统GPU</li>
                        <li>功耗：降低90%</li>
                    </ul>
                    
                    <h3>A股概念股</h3>
                    <ul>
                        <li>芯原股份（688521）- IP+ASIC定制</li>
                        <li>寒武纪（688256）- AI推理龙头</li>
                        <li>海光信息（688041）- 通用芯片</li>
                    </ul>
                    
                    <h3>跟踪事项</h3>
                    <ul>
                        <li>首个大客户公布（6-12个月）</li>
                        <li>量产时间表</li>
                    </ul>
                `,
                createdAt: '2026-02-23',
                updatedAt: '2026-02-23'
            }
        ];
        
        saveReports(defaultReports);
        
        // 添加信息源
        const defaultSources = [
            {
                id: generateId(),
                name: '一凌策略研究',
                category: 'invest',
                type: 'strategy',
                platform: '公众号',
                link: '',
                description: '国金证券牟一凌团队，实物侧+中国资产框架',
                tags: ['strategy', 'cycle'],
                createdAt: '2026-02-23'
            },
            {
                id: generateId(),
                name: '中金点晴',
                category: 'invest',
                type: 'strategy',
                platform: '公众号',
                link: '',
                description: '中金公司宏观策略研究',
                tags: ['strategy'],
                createdAt: '2026-02-24'
            },
            {
                id: generateId(),
                name: '培风客',
                category: 'invest',
                type: 'research',
                platform: '公众号',
                link: '',
                description: '投研观点与市场分析',
                tags: ['strategy'],
                createdAt: '2026-02-24'
            },
            {
                id: generateId(),
                name: '卫斯李的投研笔记',
                category: 'invest',
                type: 'research',
                platform: '公众号',
                link: '',
                description: '投资研究与行业分析',
                tags: ['strategy'],
                createdAt: '2026-02-24'
            },
            {
                id: generateId(),
                name: '机器之心',
                category: 'ai',
                type: 'ai',
                platform: '公众号/网站',
                link: 'https://www.jiqizhixin.com/',
                description: 'AI技术动态、行业趋势',
                tags: ['ai-chip'],
                createdAt: '2026-02-21'
            },
            {
                id: generateId(),
                name: '量子位',
                category: 'ai',
                type: 'ai',
                platform: '公众号/网站',
                link: 'https://www.qbitai.com/',
                description: 'AI前沿技术与产业动态',
                tags: ['ai-chip'],
                createdAt: '2026-02-24'
            },
            {
                id: generateId(),
                name: 'OpenAI Blog',
                category: 'ai',
                type: 'official',
                platform: '官网',
                link: 'https://openai.com/blog',
                description: 'GPT系列模型官方动态',
                tags: ['ai-chip'],
                createdAt: '2026-02-21'
            },
            {
                id: generateId(),
                name: 'Anthropic Blog',
                category: 'ai',
                type: 'official',
                platform: '官网',
                link: 'https://www.anthropic.com/',
                description: 'Claude系列模型官方动态',
                tags: ['ai-chip'],
                createdAt: '2026-02-21'
            },
            {
                id: generateId(),
                name: 'Hacker News',
                category: 'ai',
                type: 'tech',
                platform: '网站',
                link: 'https://news.ycombinator.com/',
                description: '科技热门、AI工具发布',
                tags: ['ai-chip'],
                createdAt: '2026-02-21'
            },
            {
                id: generateId(),
                name: '洛图科技',
                category: 'invest',
                type: 'industry',
                platform: '网站/公众号',
                link: '',
                description: '显示面板行业数据、价格追踪',
                tags: ['display'],
                createdAt: '2026-02-21'
            },
            {
                id: generateId(),
                name: 'WitsView',
                category: 'invest',
                type: 'industry',
                platform: '网站',
                link: '',
                description: '面板价格追踪',
                tags: ['display'],
                createdAt: '2026-02-21'
            },
            {
                id: generateId(),
                name: '巨潮资讯',
                category: 'invest',
                type: 'industry',
                platform: '网站',
                link: 'http://www.cninfo.com.cn/',
                description: '上市公司公告、财报',
                tags: ['strategy'],
                createdAt: '2026-02-21'
            }
        ];
        
        saveSources(defaultSources);
    }
}

// ========== 工具函数 ==========
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function updateLastUpdate() {
    const now = new Date().toISOString().split('T')[0];
    localStorage.setItem(DB_KEYS.lastUpdate, now);
    document.getElementById('lastUpdate').textContent = now;
}

// ========== 报告管理 ==========
function getReports() {
    return JSON.parse(localStorage.getItem(DB_KEYS.reports) || '[]');
}

function saveReports(reports) {
    localStorage.setItem(DB_KEYS.reports, JSON.stringify(reports));
    updateLastUpdate();
}

function addReport(report) {
    const reports = getReports();
    report.id = generateId();
    report.createdAt = new Date().toISOString().split('T')[0];
    report.updatedAt = report.createdAt;
    reports.unshift(report);
    saveReports(reports);
    return report;
}

function updateReport(id, updates) {
    const reports = getReports();
    const index = reports.findIndex(r => r.id === id);
    if (index !== -1) {
        reports[index] = { ...reports[index], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        saveReports(reports);
        return reports[index];
    }
    return null;
}

function deleteReport(id) {
    const reports = getReports().filter(r => r.id !== id);
    saveReports(reports);
}

// ========== 信息源管理 ==========
function getSources() {
    return JSON.parse(localStorage.getItem(DB_KEYS.sources) || '[]');
}

function saveSources(sources) {
    localStorage.setItem(DB_KEYS.sources, JSON.stringify(sources));
    updateLastUpdate();
}

function addSource(source) {
    const sources = getSources();
    source.id = generateId();
    source.createdAt = new Date().toISOString().split('T')[0];
    sources.unshift(source);
    saveSources(sources);
    return source;
}

function updateSource(id, updates) {
    const sources = getSources();
    const index = sources.findIndex(s => s.id === id);
    if (index !== -1) {
        sources[index] = { ...sources[index], ...updates };
        saveSources(sources);
        return sources[index];
    }
    return null;
}

function deleteSource(id) {
    const sources = getSources().filter(s => s.id !== id);
    saveSources(sources);
}

function addSourceUpdate(sourceId, date, content) {
    const sources = getSources();
    const source = sources.find(s => s.id === sourceId);
    if (!source) return null;
    
    if (!source.updates) {
        source.updates = [];
    }
    
    source.updates.unshift({
        date: date || new Date().toISOString().split('T')[0],
        content: content
    });
    
    saveSources(sources);
    return source;
}

function deleteSourceUpdate(sourceId, updateIndex) {
    if (!confirm('确定要删除这条更新记录吗？')) return;
    
    const sources = getSources();
    const source = sources.find(s => s.id === sourceId);
    if (!source || !source.updates) return;
    
    source.updates.splice(updateIndex, 1);
    saveSources(sources);
    
    // 重新渲染详情页
    viewSource(sourceId);
}

// ========== 标签管理 ==========
function getTags() {
    return JSON.parse(localStorage.getItem(DB_KEYS.tags) || '[]');
}

function saveTags(tags) {
    localStorage.setItem(DB_KEYS.tags, JSON.stringify(tags));
}

function addTag(tag) {
    const tags = getTags();
    tag.id = generateId();
    tags.push(tag);
    saveTags(tags);
    return tag;
}

function deleteTag(id) {
    const tags = getTags().filter(t => t.id !== id);
    saveTags(tags);
}

function getTagName(tagId) {
    const tag = getTags().find(t => t.id === tagId);
    return tag ? tag.name : tagId;
}

function getTagColor(tagId) {
    const tag = getTags().find(t => t.id === tagId);
    return tag ? tag.color : 'gray';
}

// ========== UI 渲染 ==========
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });
    
    // 渲染对应内容
    if (sectionId === 'reports') renderReports();
    if (sectionId === 'ai-sources') renderAISources();
    if (sectionId === 'invest-sources') renderInvestSources();
    if (sectionId === 'tags') renderTags();
    if (sectionId === 'home') renderHome();
}

function renderHome() {
    const reports = getReports();
    const sources = getSources();
    const tags = getTags();
    
    // 分别统计 AI 和投资信息源
    const aiSources = sources.filter(s => s.category === 'ai');
    const investSources = sources.filter(s => s.category === 'invest');
    
    // 更新统计
    document.getElementById('stat-reports').textContent = reports.length;
    document.getElementById('stat-ai-sources').textContent = aiSources.length;
    document.getElementById('stat-invest-sources').textContent = investSources.length;
    document.getElementById('stat-tags').textContent = tags.length;
    
    // 本月更新
    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthlyUpdates = reports.filter(r => r.updatedAt.startsWith(thisMonth)).length;
    document.getElementById('stat-updates').textContent = monthlyUpdates;
    
    // 最近更新
    const recentUpdates = document.getElementById('recentUpdates');
    const recent = reports.slice(0, 5);
    recentUpdates.innerHTML = recent.map(r => `
        <div class="timeline-item">
            <div class="timeline-date">${r.updatedAt}</div>
            <div class="timeline-content">
                <strong class="cursor-pointer hover:text-blue-600" onclick="viewReport('${r.id}')">${r.title}</strong>
                <p class="text-sm text-gray-600">${r.content.replace(/<[^>]+>/g, '').slice(0, 80)}...</p>
            </div>
        </div>
    `).join('');
    
    updateLastUpdate();
}

function renderReports(filteredReports = null) {
    const reports = filteredReports || getReports();
    const container = document.getElementById('reportsList');
    
    container.innerHTML = reports.map(report => `
        <div class="report-card">
            <div class="report-card-header">
                <div>
                    <h3 class="report-card-title cursor-pointer hover:text-blue-600" onclick="viewReport('${report.id}')">${report.title}</h3>
                    <div class="flex items-center space-x-2 mt-1">
                        <span class="badge badge-${report.type}">${getTypeLabel(report.type)}</span>
                        ${report.tags.map(tagId => `
                            <span class="tag tag-${getTagColor(tagId)}">${getTagName(tagId)}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="text-right">
                    ${report.currentPrice !== '-' ? `<div class="text-lg font-bold">${report.currentPrice}</div>` : ''}
                    ${report.targetPrice !== '-' ? `<div class="text-sm text-gray-500">目标: ${report.targetPrice}</div>` : ''}
                </div>
            </div>
            <div class="report-card-body">
                ${report.content.replace(/<[^>]+>/g, '').slice(0, 150)}...
            </div>
            <div class="flex justify-between items-center text-sm text-gray-500">
                <div class="report-card-meta">
                    <span>📅 ${report.updatedAt}</span>
                </div>
                <div class="btn-group">
                    <button onclick="editReport('${report.id}')" class="text-blue-600 hover:underline">编辑</button>
                    <button onclick="confirmDelete('report', '${report.id}')" class="text-red-600 hover:underline">删除</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // 更新筛选器
    updateFilterTags();
}

function renderAISources() {
    const sources = getSources().filter(s => s.category === 'ai');
    const container = document.getElementById('aiSourcesList');
    
    container.innerHTML = sources.map(source => {
        const lastUpdate = source.updates && source.updates.length > 0 
            ? source.updates[0].date 
            : source.createdAt;
        
        return `
            <div class="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer" onclick="viewSource('${source.id}')">
                <div class="p-4 flex justify-between items-center">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
                            <h3 class="text-lg font-semibold text-gray-800">${source.name}</h3>
                            <span class="tag tag-purple text-xs">${getTypeLabel(source.type)}</span>
                        </div>
                        <p class="text-gray-600 text-sm mt-1">${source.description}</p>
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 ${lastUpdate}</span>
                        <span class="text-purple-600">查看 →</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    if (sources.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-12">暂无 AI 信息源</div>';
    }
}

function renderInvestSources() {
    const sources = getSources().filter(s => s.category === 'invest');
    const container = document.getElementById('investSourcesList');
    
    container.innerHTML = sources.map(source => {
        const lastUpdate = source.updates && source.updates.length > 0 
            ? source.updates[0].date 
            : source.createdAt;
        
        return `
            <div class="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer" onclick="viewSource('${source.id}')">
                <div class="p-4 flex justify-between items-center">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
                            <h3 class="text-lg font-semibold text-gray-800">${source.name}</h3>
                            <span class="tag tag-green text-xs">${getTypeLabel(source.type)}</span>
                        </div>
                        <p class="text-gray-600 text-sm mt-1">${source.description}</p>
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 ${lastUpdate}</span>
                        <span class="text-green-600">查看 →</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    if (sources.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-12">暂无投资信息源</div>';
    }
}

function renderTags() {
    const tags = getTags();
    const container = document.getElementById('tagsList');
    
    container.innerHTML = tags.map(tag => {
        const count = getReports().filter(r => r.tags.includes(tag.id)).length;
        return `
            <div class="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
                <span class="tag tag-${tag.color}">${tag.name}</span>
                <span class="text-gray-500 text-sm">${count} 篇报告</span>
                <button onclick="confirmDelete('tag', '${tag.id}')" class="text-red-600 hover:text-red-800 ml-auto">✕</button>
            </div>
        `;
    }).join('');
}

function updateFilterTags() {
    const tags = getTags();
    const select = document.getElementById('filterTag');
    select.innerHTML = '<option value="">所有标签</option>' + 
        tags.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
}

function filterReports() {
    const tagId = document.getElementById('filterTag').value;
    const reports = tagId ? getReports().filter(r => r.tags.includes(tagId)) : getReports();
    renderReports(reports);
}

// ========== 搜索功能 ==========
let fuse = null;

function initSearch() {
    const reports = getReports();
    const sources = getSources();
    
    const items = [
        ...reports.map(r => ({ type: 'report', ...r })),
        ...sources.map(s => ({ type: 'source', ...s }))
    ];
    
    fuse = new Fuse(items, {
        keys: ['title', 'name', 'content', 'description', 'tags'],
        includeScore: true,
        threshold: 0.3
    });
}

function handleSearch(query) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (!query.trim()) {
        resultsDiv.classList.add('hidden');
        return;
    }
    
    initSearch();
    const results = fuse.search(query).slice(0, 10);
    
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="p-4 text-gray-500">未找到结果</div>';
    } else {
        resultsDiv.innerHTML = results.map(result => {
            const item = result.item;
            const title = item.title || item.name;
            
            let typeLabel = '';
            if (item.type === 'report') {
                typeLabel = '📊 报告';
            } else if (item.category === 'ai') {
                typeLabel = '🤖 AI信息源';
            } else {
                typeLabel = '📈 投资信息源';
            }
            
            return `
                <div class="search-result-item" onclick="${item.type === 'report' ? `viewReport('${item.id}')` : `editSource('${item.id}')`}">
                    <div class="font-semibold">${title}</div>
                    <div class="text-sm text-gray-500">${typeLabel}</div>
                </div>
            `;
        }).join('');
    }
    
    resultsDiv.classList.remove('hidden');
}

// ========== 模态框 ==========
function openModal(type, id = null, category = null) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    if (type === 'report') {
        title.textContent = id ? '编辑报告' : '新建报告';
        content.innerHTML = getReportForm(id);
    } else if (type === 'source') {
        title.textContent = id ? '编辑信息源' : '新建信息源';
        content.innerHTML = getSourceForm(id, category);
    } else if (type === 'tag') {
        title.textContent = '新建标签';
        content.innerHTML = getTagForm();
    } else if (type === 'view') {
        title.textContent = '查看报告';
        content.innerHTML = getViewReport(id);
    } else if (type === 'source-view') {
        title.textContent = '信息源详情';
        content.innerHTML = getViewSource(id);
    } else if (type === 'add-update') {
        title.textContent = '添加更新记录';
        content.innerHTML = getAddUpdateForm(id);
    }
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function getReportForm(id = null) {
    const report = id ? getReports().find(r => r.id === id) : null;
    const tags = getTags();
    
    return `
        <form onsubmit="saveReportForm(event, '${id || ''}')">
            <div class="form-group">
                <label class="form-label">标题</label>
                <input type="text" name="title" value="${report?.title || ''}" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">评级</label>
                <select name="type" class="form-select">
                    <option value="buy" ${report?.type === 'buy' ? 'selected' : ''}>买入</option>
                    <option value="hold" ${report?.type === 'hold' ? 'selected' : ''}>持有</option>
                    <option value="sell" ${report?.type === 'sell' ? 'selected' : ''}>卖出</option>
                    <option value="watch" ${report?.type === 'watch' ? 'selected' : ''}>观察</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">标签</label>
                <div class="flex flex-wrap gap-2">
                    ${tags.map(tag => `
                        <label class="inline-flex items-center">
                            <input type="checkbox" name="tags" value="${tag.id}" 
                                   ${report?.tags.includes(tag.id) ? 'checked' : ''} class="mr-1">
                            <span class="tag tag-${tag.color}">${tag.name}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">当前价格</label>
                    <input type="text" name="currentPrice" value="${report?.currentPrice || ''}" class="form-input" placeholder="4.18元">
                </div>
                <div class="form-group">
                    <label class="form-label">目标价</label>
                    <input type="text" name="targetPrice" value="${report?.targetPrice || ''}" class="form-input" placeholder="5.0-5.5元">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">内容（支持HTML）</label>
                <textarea name="content" class="form-textarea" required>${report?.content || ''}</textarea>
            </div>
            
            <div class="btn-group justify-end">
                <button type="button" onclick="closeModal()" class="btn btn-secondary">取消</button>
                <button type="submit" class="btn btn-primary">保存</button>
            </div>
        </form>
    `;
}

function getSourceForm(id = null, category = null) {
    const source = id ? getSources().find(s => s.id === id) : null;
    const tags = getTags();
    const sourceCategory = source?.category || category || 'invest';
    
    // 根据分类显示不同的类型选项
    const typeOptions = sourceCategory === 'ai' ? `
        <option value="ai" ${source?.type === 'ai' ? 'selected' : ''}>AI动态</option>
        <option value="official" ${source?.type === 'official' ? 'selected' : ''}>官方动态</option>
        <option value="tech" ${source?.type === 'tech' ? 'selected' : ''}>科技动态</option>
    ` : `
        <option value="strategy" ${source?.type === 'strategy' ? 'selected' : ''}>策略研究</option>
        <option value="research" ${source?.type === 'research' ? 'selected' : ''}>投研观点</option>
        <option value="industry" ${source?.type === 'industry' ? 'selected' : ''}>行业研究</option>
    `;
    
    return `
        <form onsubmit="saveSourceForm(event, '${id || ''}', '${sourceCategory}')">
            <input type="hidden" name="category" value="${sourceCategory}">
            
            <div class="form-group">
                <label class="form-label">名称</label>
                <input type="text" name="name" value="${source?.name || ''}" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">类型</label>
                <select name="type" class="form-select">
                    ${typeOptions}
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">平台</label>
                <input type="text" name="platform" value="${source?.platform || ''}" class="form-input" placeholder="公众号/网站">
            </div>
            
            <div class="form-group">
                <label class="form-label">链接</label>
                <input type="url" name="link" value="${source?.link || ''}" class="form-input" placeholder="https://...">
            </div>
            
            <div class="form-group">
                <label class="form-label">描述</label>
                <textarea name="description" class="form-textarea" required>${source?.description || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">标签</label>
                <div class="flex flex-wrap gap-2">
                    ${tags.map(tag => `
                        <label class="inline-flex items-center">
                            <input type="checkbox" name="tags" value="${tag.id}" 
                                   ${source?.tags.includes(tag.id) ? 'checked' : ''} class="mr-1">
                            <span class="tag tag-${tag.color}">${tag.name}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div class="btn-group justify-end">
                <button type="button" onclick="closeModal()" class="btn btn-secondary">取消</button>
                <button type="submit" class="btn btn-primary">保存</button>
            </div>
        </form>
    `;
}

function getAddUpdateForm(sourceId) {
    const source = getSources().find(s => s.id === sourceId);
    if (!source) return '<p>信息源不存在</p>';
    
    const today = new Date().toISOString().split('T')[0];
    
    return `
        <form onsubmit="saveUpdateForm(event, '${sourceId}')">
            <div class="form-group">
                <label class="form-label">信息源：${source.name}</label>
            </div>
            
            <div class="form-group">
                <label class="form-label">更新日期</label>
                <input type="date" name="date" value="${today}" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">更新内容（支持HTML）</label>
                <textarea name="content" class="form-textarea" required 
                          placeholder="输入信息源的更新内容..."></textarea>
            </div>
            
            <div class="btn-group justify-end">
                <button type="button" onclick="closeModal()" class="btn btn-secondary">取消</button>
                <button type="submit" class="btn btn-primary">保存</button>
            </div>
        </form>
    `;
}

function addSourceUpdate(sourceId) {
    openModal('add-update', sourceId);
}

function getTagForm() {
    return `
        <form onsubmit="saveTagForm(event)">
            <div class="form-group">
                <label class="form-label">标签名称</label>
                <input type="text" name="name" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">颜色</label>
                <select name="color" class="form-select">
                    <option value="blue">蓝色</option>
                    <option value="green">绿色</option>
                    <option value="purple">紫色</option>
                    <option value="orange">橙色</option>
                    <option value="red">红色</option>
                    <option value="gray">灰色</option>
                </select>
            </div>
            
            <div class="btn-group justify-end">
                <button type="button" onclick="closeModal()" class="btn btn-secondary">取消</button>
                <button type="submit" class="btn btn-primary">保存</button>
            </div>
        </form>
    `;
}

function getViewReport(id) {
    const report = getReports().find(r => r.id === id);
    if (!report) return '<p>报告不存在</p>';
    
    return `
        <div>
            <div class="flex items-center space-x-2 mb-4">
                <span class="badge badge-${report.type}">${getTypeLabel(report.type)}</span>
                ${report.tags.map(tagId => `
                    <span class="tag tag-${getTagColor(tagId)}">${getTagName(tagId)}</span>
                `).join('')}
            </div>
            
            ${report.currentPrice !== '-' ? `
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="text-sm text-gray-500">当前价格</div>
                            <div class="text-2xl font-bold">${report.currentPrice}</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-500">目标价</div>
                            <div class="text-2xl font-bold text-green-600">${report.targetPrice}</div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="prose max-w-none mb-4">
                ${report.content}
            </div>
            
            <div class="text-sm text-gray-500">
                <p>创建: ${report.createdAt} · 更新: ${report.updatedAt}</p>
            </div>
            
            <div class="btn-group justify-end mt-4">
                <button onclick="closeModal()" class="btn btn-secondary">关闭</button>
                <button onclick="closeModal(); editReport('${report.id}')" class="btn btn-primary">编辑</button>
            </div>
        </div>
    `;
}

function getViewSource(id) {
    const source = getSources().find(s => s.id === id);
    if (!source) return '<p>信息源不存在</p>';
    
    const updates = source.updates || [];
    const tagColor = source.category === 'ai' ? 'purple' : 'green';
    
    return `
        <div>
            <div class="mb-6">
                <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-2xl font-bold">${source.name}</h3>
                    <span class="tag tag-${tagColor}">${getTypeLabel(source.type)}</span>
                </div>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📍 ${source.platform}</span>
                    ${source.link ? `<a href="${source.link}" target="_blank" class="text-blue-600 hover:underline">访问链接 →</a>` : ''}
                </div>
                <p class="text-gray-600 mt-3">${source.description}</p>
                <div class="flex flex-wrap gap-2 mt-3">
                    ${source.tags.map(tagId => `
                        <span class="tag tag-${getTagColor(tagId)}">${getTagName(tagId)}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="border-t pt-4">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-semibold">📝 更新记录</h4>
                    <button onclick="addSourceUpdate('${source.id}')" class="text-${tagColor}-600 hover:underline text-sm">
                        + 添加更新
                    </button>
                </div>
                
                ${updates.length > 0 ? `
                    <div class="space-y-4">
                        ${updates.map((update, index) => `
                            <div class="bg-gray-50 rounded-lg p-4">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-sm font-semibold text-gray-700">${update.date}</span>
                                    <button onclick="deleteSourceUpdate('${source.id}', ${index})" 
                                            class="text-red-600 hover:text-red-800 text-xs">删除</button>
                                </div>
                                <div class="text-gray-700 prose max-w-none">
                                    ${update.content}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="text-center text-gray-500 py-8">
                        暂无更新记录
                    </div>
                `}
            </div>
            
            <div class="text-sm text-gray-500 mt-6">
                <p>创建: ${source.createdAt}</p>
            </div>
            
            <div class="btn-group justify-end mt-4">
                <button onclick="closeModal()" class="btn btn-secondary">关闭</button>
                <button onclick="closeModal(); editSource('${source.id}')" class="btn btn-primary">编辑信息源</button>
            </div>
        </div>
    `;
}

// ========== 表单处理 ==========
function saveReportForm(event, id) {
    event.preventDefault();
    const form = event.target;
    const data = {
        title: form.title.value,
        type: form.type.value,
        tags: Array.from(form.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value),
        currentPrice: form.currentPrice.value || '-',
        targetPrice: form.targetPrice.value || '-',
        content: form.content.value
    };
    
    if (id) {
        updateReport(id, data);
    } else {
        addReport(data);
    }
    
    closeModal();
    showSection('reports');
}

function saveSourceForm(event, id, category) {
    event.preventDefault();
    const form = event.target;
    const data = {
        name: form.name.value,
        category: form.category.value,
        type: form.type.value,
        platform: form.platform.value,
        link: form.link.value,
        description: form.description.value,
        tags: Array.from(form.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value)
    };
    
    if (id) {
        updateSource(id, data);
    } else {
        addSource(data);
    }
    
    closeModal();
    
    // 根据分类跳转到对应页面
    if (data.category === 'ai') {
        showSection('ai-sources');
    } else {
        showSection('invest-sources');
    }
}

function saveTagForm(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        name: form.name.value,
        color: form.color.value
    };
    
    addTag(data);
    closeModal();
    showSection('tags');
}

function saveUpdateForm(event, sourceId) {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const content = form.content.value;
    
    addSourceUpdate(sourceId, date, content);
    closeModal();
    
    // 重新打开信息源详情页
    viewSource(sourceId);
}

// ========== 操作函数 ==========
function viewReport(id) {
    openModal('view', id);
    document.getElementById('searchResults').classList.add('hidden');
}

function editReport(id) {
    openModal('report', id);
}

function viewSource(id) {
    openModal('source-view', id);
}

function editSource(id) {
    openModal('source', id);
}

function confirmDelete(type, id) {
    if (confirm('确定要删除吗？此操作不可恢复。')) {
        if (type === 'report') {
            deleteReport(id);
            showSection('reports');
        } else if (type === 'source') {
            deleteSource(id);
            showSection('sources');
        } else if (type === 'tag') {
            deleteTag(id);
            showSection('tags');
        }
    }
}

function getTypeLabel(type) {
    const labels = {
        buy: '买入',
        hold: '持有',
        sell: '卖出',
        watch: '观察',
        strategy: '策略研究',
        research: '投研观点',
        ai: 'AI动态',
        industry: '行业研究',
        tech: '科技动态',
        official: '官方动态'
    };
    return labels[type] || type;
}

// ========== 导入导出 ==========
function exportData() {
    const data = {
        reports: getReports(),
        sources: getSources(),
        tags: getTags(),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowledge-base-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    document.getElementById('fileInput').click();
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm(`将导入 ${data.reports?.length || 0} 个报告和 ${data.sources?.length || 0} 个信息源，是否继续？`)) {
                if (data.reports) saveReports(data.reports);
                if (data.sources) saveSources(data.sources);
                if (data.tags) saveTags(data.tags);
                
                alert('导入成功！');
                showSection('home');
            }
        } catch (error) {
            alert('导入失败：文件格式错误');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    renderHome();
    initSearch();
});

// 点击外部关闭搜索结果
document.addEventListener('click', function(e) {
    if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
        document.getElementById('searchResults').classList.add('hidden');
    }
});
