// Interatividade do Portfólio de Vitor Grey

document.addEventListener('DOMContentLoaded', () => {
  // 1. EFEITO DE SPOTLIGHT / MOUSE-FOLLOWER NO BACKGROUND
  const glowOrb = document.getElementById('glowOrb');
  const spotlightBg = document.getElementById('spotlightBg');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight * 0.35;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  // Atualiza posição do mouse
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving && glowOrb) {
      glowOrb.style.opacity = '1';
    }
  });

  // Movimento de interpolação suave (lerp) via requestAnimationFrame
  function animateSpotlight() {
    // Interpolação de 0.08 para suavidade cinematográfica
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (glowOrb) {
      glowOrb.style.left = `${currentX}px`;
      glowOrb.style.top = `${currentY}px`;
    }

    requestAnimationFrame(animateSpotlight);
  }
  requestAnimationFrame(animateSpotlight);

  // Efeito ao sair da janela
  document.addEventListener('mouseleave', () => {
    if (glowOrb) {
      glowOrb.style.opacity = '0.6';
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight * 0.4;
    }
  });

  document.addEventListener('mouseenter', () => {
    if (glowOrb) {
      glowOrb.style.opacity = '1';
    }
  });

  // Suporte a toque em mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  }, { passive: true });


  // 2. NAVBAR FIXA NO TOPO COM EFEITO DE SCROLL
  const siteHeader = document.getElementById('siteHeader');
  
  function handleNavbarScroll() {
    if (window.scrollY > 25) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Executa na carga inicial


  // 3. MENU MOBILE RESPONSIVO
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpened = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active', isOpened);
      mobileToggle.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
    });

    // Fechar menu mobile ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // 4. MODAL TÉCNICO COMPLETO PARA PROJETOS & VENDAS
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalTechTags = document.getElementById('modalTechTags');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  const fullscreenButtons = document.querySelectorAll('.botao-tela-cheia');

  function openModal(btn) {
    if (!modal || !modalImg) return;
    const imgSrc = btn.getAttribute('data-img');
    const title = btn.getAttribute('data-title') || 'Solução Sob Medida';
    const desc = btn.getAttribute('data-desc') || '';
    const highlights = (btn.getAttribute('data-highlights') || '').split('|').filter(Boolean);
    const tech = (btn.getAttribute('data-tech') || '').split(',').map(s => s.trim()).filter(Boolean);

    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    if (modalHighlights) {
      modalHighlights.innerHTML = '';
      highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalHighlights.appendChild(li);
      });
    }

    if (modalTechTags) {
      modalTechTags.innerHTML = '';
      tech.forEach(t => {
        const span = document.createElement('span');
        span.textContent = t;
        modalTechTags.appendChild(span);
      });
    }

    if (modalWhatsAppBtn) {
      modalWhatsAppBtn.href = `https://wa.me/5521999677281?text=Ol%C3%A1%20Vitor!%20Vi%20o%20projeto%20"${encodeURIComponent(title)}"%20no%20seu%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20algo%20similar.`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  fullscreenButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn));
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });


  // 4.1 INTERATIVIDADE DO DASHBOARD & MINI APP MOBILE (EXPERIÊNCIA DO LEAD)
  const simScenario = document.getElementById('simScenario');
  const simForecast = document.getElementById('simForecast');
  const simForecastVal = document.getElementById('simForecastVal');
  const btnDispararAlerta = document.getElementById('btnDispararAlerta');
  const btnSimularResolvido = document.getElementById('btnSimularResolvido');

  const valFaturamento = document.getElementById('valFaturamento');
  const deltaFaturamento = document.getElementById('deltaFaturamento');
  const valDespesas = document.getElementById('valDespesas');
  const deltaDespesas = document.getElementById('deltaDespesas');
  const valLucro = document.getElementById('valLucro');
  const deltaLucro = document.getElementById('deltaLucro');
  const valMargem = document.getElementById('valMargem');
  const deltaMargem = document.getElementById('deltaMargem');
  const alertBox = document.getElementById('alertBox');

  const phoneSaldo = document.getElementById('phoneSaldo');
  const phoneNotifText = document.getElementById('phoneNotifText');
  const phoneStatusTag = document.getElementById('phoneStatusTag');

  // Barras
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  const bar4 = document.getElementById('bar4');
  const bar5 = document.getElementById('bar5');
  const valBar4 = document.getElementById('valBar4');

  // SVG Chart paths
  const chartLineRevFc = document.getElementById('chartLineRevFc');
  const chartLineExpFc = document.getElementById('chartLineExpFc');

  const scenariosData = {
    geral: {
      fat: 'R$ 184.320',
      fatDelta: '↑ 4,7% vs. mês ant.',
      fatDeltaClass: 'up-good',
      desp: 'R$ 171.950',
      despDelta: '↑ 5,5% vs. mês ant.',
      despDeltaClass: 'up-bad',
      lucro: '+R$ 12.370',
      lucroDelta: '✓ Saldo positivo no mês',
      lucroDeltaClass: 'up-good',
      margem: '6,7%',
      margemDelta: '↑ Margem preservada',
      margemDeltaClass: 'up-good',
      bars: { b1: '100%', b2: '76%', b3: '28%', b4: '21%', b5: '14%', b4Val: '14,7k' },
      alertsBadge: '3 alertas prioritários',
      alerts: [
        { type: 'is-outlier', badge: 'outlier', tag: '⚠️ Outlier Detectado', text: '<strong>Taxas de Cartão fora do padrão:</strong> Gasto 32% acima da média histórica. Impacto de <strong>R$ 3.600</strong> na sua margem.', hint: '💡 Sugestão IA: Renegociar taxa de antecipação ou rotação de adquirente.' },
        { type: 'is-budget', badge: 'budget', tag: '⚡ Alerta de Gastos', text: '<strong>Orçamento de Frete em 92%:</strong> Faltando 10 dias para fechar o mês, o limite previsto de logística está quase esgotado.', hint: '💡 Ação recomendada: Unificar lotes de despacho com fornecedores.' },
        { type: 'is-opportunity', badge: 'success', tag: '📈 Padrão Positivo', text: '<strong>Pico de Vendas Terça-Feira:</strong> Receita 18% maior no turno da tarde impulsionada por pedidos automáticos no WhatsApp.', hint: '💡 Ação recomendada: Manter campanhas ativas nesse horário.' }
      ],
      alertText: '💡 <strong>Resumo do Gerente:</strong> Negócio lucrativo no mês (+R$ 12.370), porém com potencial de reter mais <strong>R$ 26.150/mês</strong> se os outliers de taxas e fretes forem corrigidos.',
      alertType: 'st-warning',
      phoneSaldo: 'R$ 12.370,00',
      phoneNotif: 'Alerta Gerencial: 2 despesas atípicas detectadas.',
      phoneTag: 'Lucro Preservado'
    },
    otimizado: {
      fat: 'R$ 184.320',
      fatDelta: 'Estável com margem alta',
      fatDeltaClass: 'up-good',
      desp: 'R$ 145.800',
      despDelta: '↓ 15,2% economia real',
      despDeltaClass: 'up-good',
      lucro: '+R$ 38.520',
      lucroDelta: '↑ Lucro triplicado no mês!',
      lucroDeltaClass: 'up-good',
      margem: '20,9%',
      margemDelta: '↑ +14,2 p.p. recuperados',
      margemDeltaClass: 'up-good',
      bars: { b1: '85%', b2: '65%', b3: '22%', b4: '8%', b5: '12%', b4Val: '5,6k' },
      alertsBadge: '0 alertas críticos (Resolvido)',
      alerts: [
        { type: 'is-opportunity', badge: 'success', tag: '✅ Outlier Eliminado', text: '<strong>Taxas de Cartão Otimizadas:</strong> Despesas caíram de R$ 14.7k para R$ 5.6k após renegociação.', hint: '🎉 Economia gerada: R$ 9.100 direto no bolso.' },
        { type: 'is-opportunity', badge: 'success', tag: '📦 Frete sob controle', text: '<strong>Consolidação de Rotas:</strong> Frete agora consome apenas 64% do orçamento mensal.', hint: '👍 Margem operacional em nível recorde de 20,9%.' },
        { type: 'is-opportunity', badge: 'success', tag: '🤖 Processos Automáticos', text: '<strong>Rotinas Sem Erros:</strong> 12 horas semanais de digitação manual foram poupadas.', hint: '⭐ Equipe focada em vendas e atendimento ao cliente.' }
      ],
      alertText: '✅ <strong>Otimização Concluída:</strong> Outliers eliminados. Você reteve <strong>R$ 26.150 extras</strong> de lucro líquido este mês!',
      alertType: 'st-success',
      phoneSaldo: 'R$ 38.520,00',
      phoneNotif: 'Superávit validado: R$ 38.520 em conta.',
      phoneTag: 'Superávit Saudável'
    },
    crescimento: {
      fat: 'R$ 230.400',
      fatDelta: '↑ +25% novos clientes IA',
      fatDeltaClass: 'up-good',
      desp: 'R$ 178.200',
      despDelta: 'Custos estáveis (+3,6%)',
      despDeltaClass: 'up-good',
      lucro: '+R$ 52.200',
      lucroDelta: '↑ Recorde histórico de lucro',
      lucroDeltaClass: 'up-good',
      margem: '22,6%',
      margemDelta: '↑ Alta eficiência de escala',
      margemDeltaClass: 'up-good',
      bars: { b1: '95%', b2: '72%', b3: '30%', b4: '10%', b5: '18%', b4Val: '6,2k' },
      alertsBadge: '1 alerta de capacidade',
      alerts: [
        { type: 'is-opportunity', badge: 'success', tag: '🚀 Volume em Alta', text: '<strong>Atendimento Automatizado:</strong> 4x mais leads convertidos no WhatsApp sem aumento de equipe.', hint: '📈 Faturamento bateu recorde de R$ 230.400.' },
        { type: 'is-outlier', badge: 'outlier', tag: '⚠️ Alerta de Estoque', text: '<strong>Giro 35% mais rápido:</strong> Produto principal pode esgotar em 6 dias com o ritmo atual.', hint: '💡 Ação: Disparar pedido de reposição automática.' },
        { type: 'is-opportunity', badge: 'success', tag: '💰 Lucro Máximo', text: '<strong>Margem Líquida em 22,6%:</strong> O negócio retém mais de R$ 52.000 limpos no mês.', hint: '⭐ Caixa protegido e pronto para novos investimentos.' }
      ],
      alertText: '🚀 <strong>Escala com Automação:</strong> O Agente Virtual e os relatórios automáticos permitiram crescer com custos sob controle total.',
      alertType: 'st-success',
      phoneSaldo: 'R$ 52.200,00',
      phoneNotif: 'Atendimento IA captou +37 pedidos hoje.',
      phoneTag: 'Em Forte Expansão'
    }
  };

  const alertsCount = document.getElementById('alertsCount');
  const alertsItemsGrid = document.getElementById('alertsItemsGrid');
  const phoneNotifTitle = document.getElementById('phoneNotifTitle');

  function renderAlerts(alertsList, countText) {
    if (alertsCount) alertsCount.textContent = countText;
    if (alertsItemsGrid && alertsList) {
      alertsItemsGrid.innerHTML = '';
      alertsList.forEach(item => {
        const div = document.createElement('div');
        div.className = `discreet-item ${item.type}`;
        div.innerHTML = `
          <div class="discreet-item-left">
            <span class="discreet-pill ${item.badge}">${item.badge === 'outlier' ? 'Outlier' : item.badge === 'budget' ? 'Orçamento' : 'Oportunidade'}</span>
            <span class="discreet-msg">${item.text}</span>
          </div>
          <span class="discreet-tip">${item.hint}</span>
        `;
        alertsItemsGrid.appendChild(div);
      });
    }
  }

  function updateScenario(key) {
    const data = scenariosData[key] || scenariosData.geral;
    if (valFaturamento) valFaturamento.textContent = data.fat;
    if (deltaFaturamento) {
      deltaFaturamento.textContent = data.fatDelta;
      deltaFaturamento.className = `m-delta ${data.fatDeltaClass}`;
    }
    if (valDespesas) valDespesas.textContent = data.desp;
    if (deltaDespesas) {
      deltaDespesas.textContent = data.despDelta;
      deltaDespesas.className = `m-delta ${data.despDeltaClass}`;
    }
    if (valLucro) {
      valLucro.textContent = data.lucro;
      valLucro.className = 'm-value profit-positive';
    }
    if (deltaLucro) {
      deltaLucro.textContent = data.lucroDelta;
      deltaLucro.className = `m-delta ${data.lucroDeltaClass}`;
    }
    if (valMargem) {
      valMargem.textContent = data.margem;
      valMargem.className = 'm-value profit-positive';
    }
    if (deltaMargem) {
      deltaMargem.textContent = data.margemDelta;
      deltaMargem.className = `m-delta ${data.margemDeltaClass}`;
    }

    if (alertBox) {
      alertBox.innerHTML = data.alertText;
      alertBox.className = `st-alert ${data.alertType}`;
    }

    if (phoneSaldo) phoneSaldo.textContent = data.phoneSaldo;
    if (phoneNotifText) phoneNotifText.textContent = data.phoneNotif;
    if (phoneStatusTag) phoneStatusTag.textContent = data.phoneTag;

    renderAlerts(data.alerts, data.alertsBadge);

    // Atualizar larguras das barras
    if (bar1) bar1.style.setProperty('--w', data.bars.b1);
    if (bar2) bar2.style.setProperty('--w', data.bars.b2);
    if (bar3) bar3.style.setProperty('--w', data.bars.b3);
    if (bar4) bar4.style.setProperty('--w', data.bars.b4);
    if (bar5) bar5.style.setProperty('--w', data.bars.b5);
    if (valBar4) valBar4.textContent = data.bars.b4Val;

    // Ajustar linhas de projeção do gráfico
    if (chartLineRevFc && chartLineExpFc) {
      if (key === 'otimizado') {
        chartLineRevFc.setAttribute('d', 'M277 52 L329 42 L380 35');
        chartLineExpFc.setAttribute('d', 'M277 71 L329 85 L380 98');
      } else if (key === 'crescimento') {
        chartLineRevFc.setAttribute('d', 'M277 52 L329 34 L380 20');
        chartLineExpFc.setAttribute('d', 'M277 71 L329 68 L380 65');
      } else {
        chartLineRevFc.setAttribute('d', 'M277 52 L329 45 L380 40');
        chartLineExpFc.setAttribute('d', 'M277 71 L329 60 L380 50');
      }
    }
  }

  if (simScenario) {
    simScenario.addEventListener('change', (e) => {
      updateScenario(e.target.value);
    });
  }

  if (simForecast) {
    simForecast.addEventListener('input', (e) => {
      const val = e.target.value;
      if (simForecastVal) simForecastVal.textContent = `${val} ${val === '1' ? 'mês' : 'meses'}`;
    });
  }

  if (btnDispararAlerta) {
    btnDispararAlerta.addEventListener('click', () => {
      btnDispararAlerta.textContent = '✓ Relatório Enviado no Celular!';
      btnDispararAlerta.style.background = '#10b981';
      btnDispararAlerta.style.color = '#fff';
      if (phoneNotifText) {
        phoneNotifText.textContent = 'Mensagem de teste: Fechamento enviado com sucesso via WhatsApp!';
      }
      setTimeout(() => {
        btnDispararAlerta.textContent = '⚡ Testar envio no WhatsApp';
        btnDispararAlerta.style.background = '';
        btnDispararAlerta.style.color = '';
      }, 3500);
    });
  }

  if (btnSimularResolvido) {
    btnSimularResolvido.addEventListener('click', () => {
      if (simScenario) {
        simScenario.value = 'otimizado';
        updateScenario('otimizado');
      }
      btnSimularResolvido.textContent = '🎉 Desperdícios Eliminados!';
      setTimeout(() => {
        btnSimularResolvido.textContent = '✨ Simular Otimização Agora';
      }, 2500);
    });
  }


  // 5. ANIMAÇÕES SCROLLREVEAL (se biblioteca carregada)
  if (typeof window.ScrollReveal === 'function') {
    try {
      const sr = window.ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 600,
        delay: 100,
        viewFactor: 0.05,
        reset: false
      });

      sr.reveal('.hook-content', { distance: '24px' });
      sr.reveal('.demo-showcase', { distance: '35px', delay: 200 });
      sr.reveal('#solutions .titulo', { delay: 50 });
      sr.reveal('.section-subtitle', { delay: 80 });
      sr.reveal('#container-solutions .solution-card', { interval: 120 });
      sr.reveal('#projects .titulo', { delay: 50 });
      sr.reveal('#container-projects .card', { interval: 120 });
      sr.reveal('.unified-footer', { distance: '30px', delay: 100 });
    } catch (e) {
      console.warn('ScrollReveal não inicializado:', e);
    }
  }
});
