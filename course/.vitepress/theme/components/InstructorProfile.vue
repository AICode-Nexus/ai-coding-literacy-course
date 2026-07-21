<script setup>
import { withBase } from "vitepress";
import { instructorProfile as instructor } from "../../data/instructor.js";
import HeaderUtilities from "./HeaderUtilities.vue";
import PrimaryNavigation from "./PrimaryNavigation.vue";
import SiteBrand from "./SiteBrand.vue";
</script>

<template>
  <div class="instructor-profile">
    <header class="instructor-nav">
      <a class="instructor-brand" :href="withBase('/')" aria-label="返回 AI 协同方法论首页">
        <img :src="withBase('/logo.png')" alt="">
        <SiteBrand />
      </a>
      <div class="instructor-nav-actions">
        <PrimaryNavigation active-id="instructor" />
        <HeaderUtilities tone="dark" />
      </div>
    </header>

    <main>
      <section class="instructor-hero">
        <div class="instructor-hero-copy">
          <p class="instructor-kicker"><span>{{ instructor.partyMembership }}</span> INSTRUCTOR / {{ instructor.englishName }}</p>
          <h1>
            <small>刘亚东</small>
            {{ instructor.headline }}
          </h1>
          <p class="instructor-intro">{{ instructor.introduction }}</p>
          <div class="instructor-role-line" aria-label="讲师身份">
            <span v-for="role in instructor.roles.slice(0, 4)" :key="role">{{ role }}</span>
          </div>
          <div class="instructor-actions">
            <a class="course-button course-button--primary" href="#contact">联系讲师 <span>↓</span></a>
            <a class="course-button instructor-button-ghost" href="#open-source">查看开源作品 <span>↗</span></a>
          </div>
        </div>

        <figure class="instructor-portrait">
          <div class="portrait-corner portrait-corner--top">AI-FIRST</div>
          <img
            :src="withBase('/instructor/liu-yadong.jpg')"
            width="1024"
            height="1536"
            alt="讲师刘亚东职业形象照"
            fetchpriority="high"
          >
          <figcaption>
            <span>刘亚东 · YADONG LIU</span>
            <strong>技术专家 / AI 超级个体 / 技术讲师</strong>
          </figcaption>
          <div class="portrait-corner portrait-corner--bottom">100% AI CODING</div>
        </figure>

        <dl class="instructor-metrics">
          <div v-for="metric in instructor.metrics" :key="metric.label">
            <dt>{{ metric.value }}</dt>
            <dd><strong>{{ metric.label }}</strong><span>{{ metric.note }}</span></dd>
          </div>
        </dl>
      </section>

      <section class="instructor-section instructor-section--identity">
        <header class="instructor-section-head">
          <div><span>01</span><small>IDENTITY MATRIX</small></div>
          <h2>一线实践、技术判断与组织影响力</h2>
          <p>不是只讲工具，而是把研发、架构、管理、评审和教学放进同一套 AI 协同方法中。</p>
        </header>

        <div class="instructor-role-matrix">
          <span v-for="(role, index) in instructor.roles" :key="role">
            <i>{{ String(index + 1).padStart(2, '0') }}</i>{{ role }}
          </span>
        </div>

        <div class="instructor-expertise-grid">
          <article v-for="item in instructor.expertise" :key="item.index">
            <span>{{ item.index }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="instructor-section instructor-section--honors">
        <header class="instructor-section-head">
          <div><span>02</span><small>HONORS &amp; SERVICE</small></div>
          <h2>荣誉来自个人突破，也来自团队共同交付</h2>
          <p>先后获得或参与获得以下荣誉，并持续承担集团顾问、评审与训练营讲师工作。</p>
        </header>

        <ol class="instructor-honor-wall">
          <li v-for="(honor, index) in instructor.honors" :key="honor">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ honor }}</strong>
            <i aria-hidden="true">✦</i>
          </li>
        </ol>
      </section>

      <section id="open-source" class="instructor-section instructor-section--opensource">
        <header class="instructor-section-head instructor-section-head--light">
          <div><span>03</span><small>OPEN-SOURCE PROOF</small></div>
          <h2>把方法写成代码，把经验留在公开仓库</h2>
          <p>精选最能代表 AI 基础设施、知识工具、课程、工程治理与 UI 系统实践的开源作品。</p>
        </header>

        <div class="instructor-profile-links">
          <a
            v-for="profile in instructor.profiles"
            :key="profile.url"
            :href="profile.url"
            target="_blank"
            rel="noreferrer"
          >
            <small>{{ profile.meta }}</small>
            <strong>{{ profile.label }}</strong>
            <span>打开主页 ↗</span>
          </a>
        </div>

        <div class="instructor-project-grid">
          <article
            v-for="project in instructor.projects"
            :key="project.name"
            :class="{ 'is-featured': project.featured }"
          >
            <header><span>{{ project.index }}</span><small>{{ project.kind }}</small></header>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <footer class="instructor-project-links" :aria-label="`${project.name} 项目链接`">
              <a
                v-for="link in project.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noreferrer"
              >
                {{ link.label }} <i aria-hidden="true">↗</i>
              </a>
            </footer>
          </article>
        </div>
      </section>

      <section id="contact" class="instructor-section instructor-section--contact">
        <header class="instructor-section-head">
          <div><span>04</span><small>STAY CONNECTED</small></div>
          <h2>选择你习惯的方式，继续交流</h2>
          <p>公众号获取持续更新；微信用于课程与技术交流；讯飞同事也可以通过 i 讯飞联系。</p>
        </header>

        <div class="instructor-contact-grid">
          <article v-for="contact in instructor.contacts" :key="contact.label">
            <header><span>{{ contact.label }}</span><i>SCAN</i></header>
            <div class="contact-qr-frame">
              <img
                :src="withBase(contact.image)"
                :width="contact.width"
                :height="contact.height"
                :alt="`${contact.label}：${contact.title} 二维码`"
                loading="lazy"
              >
            </div>
            <h3>{{ contact.title }}</h3>
            <p>{{ contact.description }}</p>
          </article>
        </div>
      </section>
    </main>

    <footer class="instructor-footer">
      <div><strong>刘亚东</strong><span>AI-FIRST ENGINEERING · OPEN SOURCE · EDUCATION</span></div>
      <a :href="withBase('/')">返回课程首页 <span>↑</span></a>
    </footer>
  </div>
</template>
