<script setup>
const props = defineProps({
  visual: { type: Object, required: true },
});

const itemKey = (item, index) => item?.key || item?.name || item?.title || item?.level || `${index}`;
</script>

<template>
  <div
    class="stage-visual"
    :class="[`visual-${visual.type}`, visual.variant ? `is-${visual.variant}` : null]"
    aria-hidden="true"
  >
    <template v-if="visual.type === 'split'">
      <div class="visual-panel visual-panel-muted">
        <span class="visual-label">{{ visual.left.label }}</span>
        <strong>{{ visual.left.value }}</strong>
        <small>{{ visual.left.note }}</small>
      </div>
      <div class="visual-transfer"><span>→</span><small>升级</small></div>
      <div class="visual-panel visual-panel-accent">
        <span class="visual-label">{{ visual.right.label }}</span>
        <strong>{{ visual.right.value }}</strong>
        <small>{{ visual.right.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'poll'">
      <div
        v-for="(item, index) in visual.items"
        :key="itemKey(item, index)"
        class="poll-card"
        :class="{ 'is-emphasized': item.emphasized }"
      >
        <span>{{ item.key }}</span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'columns'">
      <div
        v-for="(item, index) in visual.items"
        :key="itemKey(item, index)"
        class="column-card"
        :class="{ 'is-emphasized': item.emphasized }"
      >
        <span class="column-index">{{ item.level }}</span>
        <strong>{{ item.title }}</strong>
        <div class="column-result">{{ item.result }}</div>
        <small>{{ item.signal }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'checklist'">
      <div v-for="(item, index) in visual.items" :key="itemKey(item, index)" class="check-item">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ typeof item === 'string' ? item : item.name }}</strong>
      </div>
    </template>

    <template v-else-if="visual.type === 'tshape'">
      <div class="t-bar">
        <span v-for="item in visual.bar" :key="item">{{ item }}</span>
      </div>
      <div class="t-stem">
        <span v-for="item in visual.stem" :key="item">{{ item }}</span>
      </div>
    </template>

    <template v-else-if="visual.type === 'modelSelector'">
      <div class="selector-core"><strong>{{ visual.center }}</strong></div>
      <div
        v-for="(item, index) in visual.items"
        :key="item.name"
        class="selector-item"
        :style="{ '--i': index, '--total': visual.items.length }"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item.name }}</strong>
        <small>{{ item.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'toolLandscape'">
      <div class="landscape-core"><span>CAPABILITY MAP</span><strong>{{ visual.center }}</strong></div>
      <div class="landscape-grid">
        <div v-for="item in visual.items" :key="item.key" class="landscape-item">
          <span>{{ item.key }}</span><strong>{{ item.name }}</strong><small>{{ item.note }}</small>
        </div>
      </div>
    </template>

    <template v-else-if="visual.type === 'knowledgeMap'">
      <div v-for="lane in visual.lanes" :key="lane.name" class="knowledge-lane">
        <strong>{{ lane.name }}</strong>
        <div><span v-for="item in lane.items" :key="item">{{ item }}</span></div>
      </div>
    </template>

    <template v-else-if="visual.type === 'beforeAfter'">
      <div class="flow-lane flow-lane-before">
        <span class="lane-label">旧方式</span>
        <div class="flow-nodes">
          <template v-for="(item, index) in visual.before" :key="item">
            <div class="flow-node">{{ item }}</div>
            <i v-if="index < visual.before.length - 1" class="flow-connector">→</i>
          </template>
        </div>
      </div>
      <div class="flow-lane flow-lane-after">
        <span class="lane-label">新方式</span>
        <div class="flow-nodes">
          <template v-for="(item, index) in visual.after" :key="item">
            <div class="flow-node">{{ item }}</div>
            <i v-if="index < visual.after.length - 1" class="flow-connector">→</i>
          </template>
        </div>
      </div>
    </template>

    <template v-else-if="visual.type === 'steps' || visual.type === 'timeline'">
      <div
        v-for="(item, index) in visual.items"
        :key="itemKey(item, index)"
        class="step-node"
        :style="{ '--step': index }"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ typeof item === 'string' ? item : item.title }}</strong>
        <small v-if="typeof item !== 'string' && item.example">{{ item.example }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'rewrite'">
      <div class="rewrite-row rewrite-bad"><span>模糊请求</span><strong>{{ visual.bad }}</strong></div>
      <div class="rewrite-arrow">↓</div>
      <div class="rewrite-row rewrite-good"><span>任务结果</span><strong>{{ visual.good }}</strong></div>
      <div class="tag-row">
        <span v-for="(tag, index) in visual.tags" :key="itemKey(tag, index)">
          <b>{{ typeof tag === 'string' ? tag : tag.title }}</b>
          <small v-if="typeof tag !== 'string'">{{ tag.example }}</small>
        </span>
      </div>
    </template>

    <template v-else-if="visual.type === 'stack' || visual.type === 'layers'">
      <div v-for="(item, index) in visual.layers || visual.items" :key="itemKey(item, index)" class="stack-layer">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item.name }}</strong>
        <small>{{ item.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'contract'">
      <div v-for="(item, index) in visual.items" :key="`${item.name}-${index}`" class="contract-cell">
        <span>{{ item.key }}</span>
        <strong>{{ item.name }}</strong>
        <small>{{ item.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'promptContract'">
      <div class="prompt-summary">
        <span v-for="(item, index) in visual.fields" :key="itemKey(item, index)">
          <b>{{ item.key }}</b><strong>{{ item.value }}</strong>
        </span>
      </div>
      <div class="prompt-example">
        <span>可直接使用的 Prompt</span>
        <p v-for="(line, index) in visual.prompt" :key="line"><b>{{ index + 1 }}</b>{{ line }}</p>
      </div>
    </template>

    <template v-else-if="visual.type === 'pyramid'">
      <div v-for="(layer, index) in visual.layers" :key="layer.name" class="pyramid-layer" :style="{ '--level': index }">
        <strong>{{ layer.name }}</strong><small>{{ layer.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'loop' || visual.type === 'agentLoop'">
      <div v-if="visual.center" class="loop-center">{{ visual.center }}</div>
      <div class="loop-track">
        <div v-for="(node, index) in visual.nodes" :key="node" class="loop-node" :style="{ '--i': index, '--total': visual.nodes.length }">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ node }}
        </div>
      </div>
      <div class="loop-gate">{{ visual.gate }}</div>
    </template>

    <template v-else-if="visual.type === 'rings'">
      <div v-for="(item, index) in visual.items" :key="item.name" class="ring-item" :style="{ '--i': index }">
        <div class="ring-label"><strong>{{ item.name }}</strong><small>{{ item.note }}</small></div>
      </div>
      <div class="ring-core">RESULT</div>
    </template>

    <template v-else-if="visual.type === 'signal'">
      <div class="signal-cloud signal-noisy">
        <span class="signal-label">全部塞入</span>
        <i v-for="item in visual.noisy" :key="item">{{ item }}</i>
      </div>
      <div class="signal-filter">FILTER</div>
      <div class="signal-cloud signal-focused">
        <span class="signal-label">高信号</span>
        <i v-for="item in visual.focused" :key="item">{{ item }}</i>
      </div>
    </template>

    <template v-else-if="visual.type === 'pipeline'">
      <div class="pipeline-side"><span v-for="item in visual.side" :key="item">{{ item }}</span></div>
      <div class="pipeline-main">
        <div v-for="(item, index) in visual.items" :key="item"><span>{{ index + 1 }}</span><strong>{{ item }}</strong><i v-if="index < visual.items.length - 1">→</i></div>
      </div>
    </template>

    <template v-else-if="visual.type === 'drift'">
      <div class="drift-anchor"><span>INTENT</span><strong>{{ visual.left }}</strong></div>
      <div class="drift-gap">
        <i v-for="item in visual.middle" :key="item">{{ item }}</i>
        <b>{{ visual.action }}</b>
      </div>
      <div class="drift-anchor"><span>FACTS</span><strong>{{ visual.right }}</strong></div>
    </template>

    <template v-else-if="visual.type === 'constellation'">
      <div class="constellation-core">{{ visual.center }}</div>
      <div v-for="(item, index) in visual.items" :key="item.name" class="constellation-item" :style="{ '--i': index }">
        <strong>{{ item.name }}</strong><small>{{ item.note }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'decision'">
      <div
        v-for="(item, index) in visual.items"
        :key="item.name"
        class="decision-card"
        :class="{ 'is-emphasized': item.emphasized }"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item.name }}</strong>
        <p>{{ item.when }}</p>
        <small>协调成本 · {{ item.cost }}</small>
      </div>
    </template>

    <template v-else-if="visual.type === 'lanes'">
      <div class="parallel-lane parallel-good"><span>✓ 适合并行</span><strong v-for="item in visual.good" :key="item">{{ item }}</strong></div>
      <div class="parallel-lane parallel-bad"><span>× 保持顺序</span><strong v-for="item in visual.bad" :key="item">{{ item }}</strong></div>
    </template>

    <template v-else-if="visual.type === 'console'">
      <div class="console-head"><i></i><i></i><i></i><span>AGENT CONTROL PLANE</span></div>
      <div class="console-grid"><div v-for="module in visual.modules" :key="module"><span>●</span>{{ module }}</div></div>
      <div class="console-status">{{ visual.status }}</div>
    </template>

    <template v-else-if="visual.type === 'scenario'">
      <div class="scenario-demo-cell scenario-target"><span>01 · 目标</span><strong>{{ visual.target }}</strong></div>
      <div class="scenario-demo-cell"><span>02 · 输入</span><strong>{{ visual.input }}</strong></div>
      <div class="scenario-demo-cell scenario-artifact"><span>03 · 预期交付物</span><strong>{{ visual.artifact }}</strong></div>
      <div class="scenario-demo-cell scenario-fallback"><span>04 · 静态兜底</span><strong>{{ visual.fallback }}</strong></div>
    </template>

    <template v-else-if="visual.type === 'trace'">
      <div class="trace-flow"><div v-for="(node, index) in visual.nodes" :key="node"><span>{{ index + 1 }}</span><strong>{{ node }}</strong><i v-if="index < visual.nodes.length - 1">→</i></div></div>
      <div class="trace-alerts"><span v-for="alert in visual.alerts" :key="alert">! {{ alert }}</span></div>
    </template>

    <template v-else-if="visual.type === 'riskMatrix'">
      <div class="matrix-axis matrix-axis-x">{{ visual.axes.x }}</div>
      <div class="matrix-axis matrix-axis-y">{{ visual.axes.y }}</div>
      <div class="risk-grid">
        <div v-for="item in visual.items" :key="item.name" :class="`risk-${item.risk}`"><span>{{ item.risk }}</span><strong>{{ item.name }}</strong></div>
      </div>
    </template>

    <template v-else-if="visual.type === 'handoff'">
      <div class="handoff-side"><span>AI · 扩大检查面</span><i v-for="item in visual.ai" :key="item">{{ item }}</i></div>
      <div class="handoff-bridge">{{ visual.bridge }}<b>⇄</b></div>
      <div class="handoff-side handoff-human"><span>HUMAN · 承担后果</span><i v-for="item in visual.human" :key="item">{{ item }}</i></div>
    </template>

    <template v-else-if="visual.type === 'assetLoop'">
      <div class="asset-column asset-work">
        <span>WORK</span><strong v-for="(item, index) in visual.work" :key="item"><i>{{ index + 1 }}</i>{{ item }}</strong>
      </div>
      <div class="asset-loop-core"><b>↻</b><strong>{{ visual.center }}</strong><small>版本化 · 验证 · 更新</small></div>
      <div class="asset-column asset-store">
        <span>ASSETS</span><strong v-for="item in visual.assets" :key="item">{{ item }}</strong>
      </div>
    </template>

    <template v-else-if="visual.type === 'roleTransfer'">
      <div class="role-method">
        <span>SHARED METHOD</span>
        <strong v-for="item in visual.center" :key="item">{{ item }}</strong>
      </div>
      <div class="role-grid">
        <div v-for="role in visual.roles" :key="role.name" class="role-card">
          <span>{{ role.name }}</span><strong>{{ role.note }}</strong>
        </div>
      </div>
    </template>

    <template v-else-if="visual.type === 'closing'">
      <div class="closing-orbit"><i v-for="index in 7" :key="index" :style="{ '--i': index }"></i><span>AI × HUMAN</span></div>
      <div class="closing-copy"><strong>{{ visual.statement }}</strong><small>{{ visual.prompt }}</small></div>
    </template>
  </div>
</template>
