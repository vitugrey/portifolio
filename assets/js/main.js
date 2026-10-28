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


  // 4. MODAL TÉCNICO COMPLETO COM CARROSSEL PARA PROJETOS
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalBadge = document.getElementById('modalBadge');
  const modalProblemText = document.getElementById('modalProblemText');
  const modalSolutionText = document.getElementById('modalSolutionText');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
  const modalDemoBtn = document.getElementById('modalDemoBtn');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalGithubText = document.getElementById('modalGithubText');

  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');
  const carouselCaptionOverlay = document.getElementById('carouselCaptionOverlay');
  const carouselThumbsRow = document.getElementById('carouselThumbsRow');
  const modalCarouselStage = document.getElementById('modalCarouselStage');

  let currentCarouselImages = [];
  let currentCarouselIndex = 0;

  function updateCarouselSlide(index) {
    if (!currentCarouselImages.length) return;
    currentCarouselIndex = (index + currentCarouselImages.length) % currentCarouselImages.length;
    const item = currentCarouselImages[currentCarouselIndex];

    if (modalImg) {
      modalImg.style.opacity = '0.3';
      setTimeout(() => {
        modalImg.src = item.src;
        modalImg.alt = item.title || 'Tela do Projeto';
        modalImg.style.opacity = '1';
      }, 120);
    }

    if (carouselCaptionOverlay) {
      carouselCaptionOverlay.textContent = item.title || `Tela ${currentCarouselIndex + 1}`;
    }

    if (carouselThumbsRow) {
      const thumbs = carouselThumbsRow.querySelectorAll('.carousel-thumb-btn');
      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentCarouselIndex);
      });
    }
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarouselSlide(currentCarouselIndex - 1);
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarouselSlide(currentCarouselIndex + 1);
    });
  }

  const fullscreenButtons = document.querySelectorAll('.botao-tela-cheia');

  function openModal(btn) {
    if (!modal || !modalImg) return;
    const imgSrc = btn.getAttribute('data-img');
    const title = btn.getAttribute('data-title') || 'Solução Sob Medida';
    const badge = btn.getAttribute('data-badge') || 'Ficha Técnica & Arquitetura';
    const desc = btn.getAttribute('data-desc') || '';
    const highlights = (btn.getAttribute('data-highlights') || '').split('|').filter(Boolean);
    const tech = (btn.getAttribute('data-tech') || '').split(',').map(s => s.trim()).filter(Boolean);
    const demoUrl = btn.getAttribute('data-demo-url') || '#';
    const githubUrl = btn.getAttribute('data-github-url');
    const rawImages = btn.getAttribute('data-images');

    if (modalTitle) modalTitle.textContent = title;
    if (modalBadge) modalBadge.textContent = badge;
    if (modalDesc) modalDesc.textContent = desc;

    const problem = btn.getAttribute('data-problem') || '';
    const solution = btn.getAttribute('data-solution') || '';

    if (modalProblemText) modalProblemText.textContent = problem;
    if (modalSolutionText) modalSolutionText.textContent = solution;

    // Configurar Carrossel de Imagens
    if (rawImages) {
      try {
        currentCarouselImages = JSON.parse(rawImages);
      } catch (err) {
        currentCarouselImages = [{ src: imgSrc, title: title }];
      }
    } else {
      currentCarouselImages = [{ src: imgSrc, title: title }];
    }

    if (currentCarouselImages.length > 1) {
      if (carouselPrevBtn) carouselPrevBtn.style.display = 'flex';
      if (carouselNextBtn) carouselNextBtn.style.display = 'flex';
      if (carouselCaptionOverlay) carouselCaptionOverlay.style.display = 'block';
      if (carouselThumbsRow) {
        carouselThumbsRow.style.display = 'flex';
        carouselThumbsRow.innerHTML = '';
        currentCarouselImages.forEach((imgObj, idx) => {
          const thumbBtn = document.createElement('button');
          thumbBtn.type = 'button';
          thumbBtn.className = `carousel-thumb-btn ${idx === 0 ? 'active' : ''}`;
          thumbBtn.setAttribute('aria-label', `Ver tela ${idx + 1}`);
          thumbBtn.innerHTML = `<img src="${imgObj.src}" alt="${imgObj.title || ''}">`;
          thumbBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCarouselSlide(idx);
          });
          carouselThumbsRow.appendChild(thumbBtn);
        });
      }
      updateCarouselSlide(0);
    } else {
      // Imagem única
      modalImg.src = imgSrc;
      modalImg.style.opacity = '1';
      if (carouselPrevBtn) carouselPrevBtn.style.display = 'none';
      if (carouselNextBtn) carouselNextBtn.style.display = 'none';
      if (carouselCaptionOverlay) carouselCaptionOverlay.style.display = 'none';
      if (carouselThumbsRow) carouselThumbsRow.style.display = 'none';
    }

    if (modalHighlights) {
      modalHighlights.innerHTML = '';
      highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalHighlights.appendChild(li);
      });
    }



    // Botão de Demonstração (ocupa 3/10 da largura)
    if (modalDemoBtn) {
      if (demoUrl && demoUrl !== '#') {
        modalDemoBtn.href = demoUrl;
        modalDemoBtn.target = '_blank';
        modalDemoBtn.innerHTML = `<span>Demo</span>`;
      } else {
        modalDemoBtn.href = 'javascript:void(0)';
        modalDemoBtn.target = '_self';
        modalDemoBtn.innerHTML = `<span>Demo</span>`;
        modalDemoBtn.onclick = (e) => {
          e.preventDefault();
          modalDemoBtn.innerHTML = `<span>Preparando...</span>`;
          setTimeout(() => { modalDemoBtn.innerHTML = `<span>Demo</span>`; }, 2000);
        };
      }
    }

    // Botão Verde de WhatsApp com mensagem personalizada
    if (modalWhatsAppBtn) {
      modalWhatsAppBtn.href = `https://wa.me/5521999677281?text=Ol%C3%A1%20Vitor!%20Vi%20o%20projeto%20"${encodeURIComponent(title)}"%20no%20seu%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20uma%20solu%C3%A7%C3%A3o%20similar.`;
    }

    // Link do GitHub
    if (modalGithubLink) {
      if (githubUrl) {
        modalGithubLink.style.display = 'inline-flex';
        modalGithubLink.href = githubUrl;
        if (modalGithubText) {
          modalGithubText.textContent = `Repositório Oficial: ${githubUrl.replace('https://', '')}`;
        }
      } else {
        modalGithubLink.style.display = 'none';
      }
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
    if (modal?.classList.contains('open') && currentCarouselImages.length > 1) {
      if (e.key === 'ArrowLeft') updateCarouselSlide(currentCarouselIndex - 1);
      if (e.key === 'ArrowRight') updateCarouselSlide(currentCarouselIndex + 1);
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
      fatDelta: '↑ 4,7% vs. ant.',
      fatDeltaClass: 'up-good',
      desp: 'R$ 171.950',
      despDelta: '↑ 5,5% vs. ant.',
      despDeltaClass: 'up-bad',
      lucro: '+R$ 12.370',
      lucroNum: 12370,
      lucroDelta: '✓ Saldo positivo',
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
      fatDelta: 'Estável (+14% margem)',
      fatDeltaClass: 'up-good',
      desp: 'R$ 145.800',
      despDelta: '↓ 15,2% economia',
      despDeltaClass: 'up-good',
      lucro: '+R$ 38.520',
      lucroNum: 38520,
      lucroDelta: '↑ Lucro triplicado',
      lucroDeltaClass: 'up-good',
      margem: '20,9%',
      margemDelta: '↑ +14,2 p.p. lucro',
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
      fatDelta: '↑ +25% receita IA',
      fatDeltaClass: 'up-good',
      desp: 'R$ 178.200',
      despDelta: 'Custos sob controle',
      despDeltaClass: 'up-good',
      lucro: '+R$ 52.200',
      lucroNum: 52200,
      lucroDelta: '↑ Recorde histórico',
      lucroDeltaClass: 'up-good',
      margem: '22,6%',
      margemDelta: '↑ Eficiência 22,6%',
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
  const labelCard4 = document.getElementById('labelCard4');
  const forecastZone = document.getElementById('forecastZone');
  const forecastLabel = document.getElementById('forecastLabel');
  const ptRevFc = document.getElementById('ptRevFc');
  const ptExpFc = document.getElementById('ptExpFc');
  const axisFc1 = document.getElementById('axisFc1');
  const axisFc2 = document.getElementById('axisFc2');

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

  function updateForecast(months, scenarioKey) {
    const data = scenariosData[scenarioKey] || scenariosData.geral;
    const m = Math.max(1, Math.min(6, parseInt(months, 10) || 3));
    
    if (simForecastVal) {
      simForecastVal.textContent = `${m} ${m === 1 ? 'mês' : 'meses'}`;
    }

    const lucroBase = data.lucroNum || 12370;
    const lucroAcumulado = lucroBase * m;
    const formattedAcumulado = (lucroAcumulado >= 0 ? '+R$ ' : '-R$ ') + Math.abs(lucroAcumulado).toLocaleString('pt-BR');

    // Atualiza Card 4 com a previsão ou margem
    if (labelCard4) {
      labelCard4.textContent = m === 1 ? 'Margem Operacional' : `Previsão (${m} meses)`;
    }
    if (valMargem) {
      valMargem.textContent = m === 1 ? data.margem : formattedAcumulado;
    }
    if (deltaMargem) {
      deltaMargem.textContent = m === 1 ? data.margemDelta : `↑ Margem média ${data.margem}`;
      deltaMargem.className = `m-delta ${data.margemDeltaClass}`;
    }

    // Atualiza projeção visual no gráfico SVG
    const xStart = 277;
    const xEnd = Math.min(392, Math.round(xStart + ((m / 6) * 115)));
    const zoneWidth = Math.max(38, xEnd - xStart + 8);

    if (forecastZone) {
      forecastZone.setAttribute('width', zoneWidth);
    }
    if (forecastLabel) {
      forecastLabel.setAttribute('x', Math.round(xStart + (zoneWidth / 2)));
      forecastLabel.textContent = `IA (${m}m)`;
    }

    let yRevEnd = 40;
    let yExpEnd = 50;
    let revPath = '';
    let expPath = '';

    if (scenarioKey === 'otimizado') {
      yRevEnd = Math.round(52 - (m * 3.5));
      yExpEnd = Math.round(71 + (m * 4.6));
      const xMid = Math.round((xStart + xEnd) / 2);
      const yRevMid = Math.round((52 + yRevEnd) / 2);
      const yExpMid = Math.round((71 + yExpEnd) / 2);
      revPath = `M277 52 Q ${xMid} ${yRevMid - 2}, ${xEnd} ${yRevEnd}`;
      expPath = `M277 71 Q ${xMid} ${yExpMid + 2}, ${xEnd} ${yExpEnd}`;
    } else if (scenarioKey === 'crescimento') {
      yRevEnd = Math.round(52 - (m * 5.8));
      yExpEnd = Math.round(71 - (m * 1.2));
      const xMid = Math.round((xStart + xEnd) / 2);
      const yRevMid = Math.round((52 + yRevEnd) / 2);
      const yExpMid = Math.round((71 + yExpEnd) / 2);
      revPath = `M277 52 Q ${xMid} ${yRevMid - 3}, ${xEnd} ${yRevEnd}`;
      expPath = `M277 71 Q ${xMid} ${yExpMid}, ${xEnd} ${yExpEnd}`;
    } else {
      yRevEnd = Math.round(52 - (m * 2.0));
      yExpEnd = Math.round(71 - (m * 2.8));
      const xMid = Math.round((xStart + xEnd) / 2);
      const yRevMid = Math.round((52 + yRevEnd) / 2);
      const yExpMid = Math.round((71 + yExpEnd) / 2);
      revPath = `M277 52 Q ${xMid} ${yRevMid}, ${xEnd} ${yRevEnd}`;
      expPath = `M277 71 Q ${xMid} ${yExpMid}, ${xEnd} ${yExpEnd}`;
    }

    if (chartLineRevFc) chartLineRevFc.setAttribute('d', revPath);
    if (chartLineExpFc) chartLineExpFc.setAttribute('d', expPath);

    if (ptRevFc) {
      ptRevFc.setAttribute('cx', xEnd);
      ptRevFc.setAttribute('cy', yRevEnd);
    }
    if (ptExpFc) {
      ptExpFc.setAttribute('cx', xEnd);
      ptExpFc.setAttribute('cy', yExpEnd);
    }

    // Meses no eixo X
    const axisLabels = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    if (axisFc1) {
      axisFc1.textContent = axisLabels[0];
      axisFc1.setAttribute('x', Math.round(xStart + (zoneWidth * 0.35)));
    }
    if (axisFc2) {
      axisFc2.textContent = axisLabels[Math.min(m - 1, 5)];
      axisFc2.setAttribute('x', xEnd);
    }

    // Atualiza saldo do smartphone para refletir previsão quando relevante
    if (phoneSaldo && m > 1) {
      phoneSaldo.textContent = formattedAcumulado + ',00';
    } else if (phoneSaldo) {
      phoneSaldo.textContent = data.phoneSaldo;
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

    if (alertBox) {
      alertBox.innerHTML = data.alertText;
      alertBox.className = `st-alert ${data.alertType}`;
    }

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

    // Atualiza a previsão com base no valor atual do slider
    const currentMonths = simForecast ? simForecast.value : 3;
    updateForecast(currentMonths, key);
  }

  if (simScenario) {
    simScenario.addEventListener('change', (e) => {
      updateScenario(e.target.value);
    });
  }

  if (simForecast) {
    simForecast.addEventListener('input', (e) => {
      const currentScenario = simScenario ? simScenario.value : 'geral';
      updateForecast(e.target.value, currentScenario);
    });
  }

  function triggerReportSendFeedback() {
    if (btnDispararAlerta) {
      btnDispararAlerta.textContent = '✓ Relatório Enviado no WhatsApp!';
      btnDispararAlerta.style.background = '#00DC82';
      btnDispararAlerta.style.color = '#05140C';
    }
    if (btnSimularResolvido) {
      btnSimularResolvido.textContent = '✓ Relatório Enviado!';
      btnSimularResolvido.style.background = '#00DC82';
      btnSimularResolvido.style.color = '#05140C';
    }
    if (phoneNotifTitle) {
      phoneNotifTitle.textContent = 'Relatório no WhatsApp Enviado';
      phoneNotifTitle.style.color = '#00DC82';
    }
    if (phoneNotifText) {
      phoneNotifText.textContent = 'Fechamento de caixa, fluxo e projeção entregues no WhatsApp da diretoria.';
    }

    setTimeout(() => {
      if (btnDispararAlerta) {
        btnDispararAlerta.textContent = '⚡ Enviar relatório para WhatsApp';
        btnDispararAlerta.style.background = '';
        btnDispararAlerta.style.color = '';
      }
      if (btnSimularResolvido) {
        btnSimularResolvido.textContent = '⚡ Enviar relatório para WhatsApp';
        btnSimularResolvido.style.background = '';
        btnSimularResolvido.style.color = '';
      }
    }, 3500);
  }

  if (btnDispararAlerta) {
    btnDispararAlerta.addEventListener('click', triggerReportSendFeedback);
  }

  if (btnSimularResolvido) {
    btnSimularResolvido.addEventListener('click', triggerReportSendFeedback);
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
