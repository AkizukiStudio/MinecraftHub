<template>
  <div class="footer-wrapper">
    <footer class="global-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>AkizukiStudio</h3>
          <p>致力于提供优质的Minecraft相关资源和服务</p>
        </div>
        <div class="footer-section">
          <h4>快速链接</h4>
          <ul>
            <li><a href="/home/">首页</a></li>
            <li><a href="/MC/Nav/">资源导航</a></li>
            <li><a href="/about/">关于我们</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>联系我们</h4>
          <p>邮箱: contact@akizukistudio.com</p>
          <div class="social-links">
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">Discord</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 AkizukiStudio. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter'
}
</script>

<style scoped>
.footer-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: 60px;
}

.global-footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 40px 0 0;
  width: 100%;
  border-top: 4px solid #3498db;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 20px;
}

.footer-section h3 {
  color: #3498db;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.footer-section h4 {
  color: #3498db;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 10px;
  color: #bdc3c7;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section a {
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.footer-section a:hover {
  color: #3498db;
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social-link {
  padding: 5px 10px;
  background-color: #34495e;
  border-radius: 3px;
  font-size: 0.9rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.social-link:hover {
  background-color: #3498db;
  color: white;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  margin-top: 30px;
  padding: 20px;
  text-align: center;
  background-color: #1a252f;
}

.footer-bottom p {
  margin: 0;
  color: #95a5a6;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .footer-section {
    text-align: center;
  }
  
  .footer-wrapper {
    margin-top: 40px;
  }
  
  .global-footer {
    padding: 30px 0 0;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 0 15px;
  }
  
  .global-footer {
    padding: 20px 0 0;
  }
}
</style>