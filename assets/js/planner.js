/**
 * VietWander - AI Trip Planner Logic
 * Generates custom itineraries using Gemini AI backend or fallback smart rules
 */

document.addEventListener('DOMContentLoaded', () => {
  const plannerForm = document.getElementById('ai-planner-form');
  if (!plannerForm) return;

  const destinationInput = document.getElementById('planner-destination');
  const daysSelect = document.getElementById('planner-days');
  const budgetSelect = document.getElementById('planner-budget');
  const styleSelect = document.getElementById('planner-style');
  const loadingState = document.getElementById('planner-loading');
  const resultContainer = document.getElementById('planner-result');
  const emptyState = document.getElementById('planner-empty');

  // Quick Chips
  document.querySelectorAll('.quick-dest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const dest = chip.getAttribute('data-dest');
      if (destinationInput && dest) {
        destinationInput.value = dest;
        chip.classList.add('active');
        setTimeout(() => chip.classList.remove('active'), 400);
      }
    });
  });

  // Check URL param for prefilled destination
  const urlParams = new URLSearchParams(window.location.search);
  const prefillDest = urlParams.get('destination');
  if (prefillDest && destinationInput) {
    destinationInput.value = prefillDest;
  }

  plannerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const destination = destinationInput ? destinationInput.value.trim() : '';
    if (!destination) {
      if (window.Validation && destinationInput) {
        window.Validation.markField(destinationInput, false, 'Vui lòng nhập tên địa điểm du lịch');
      }
      destinationInput?.focus();
      return;
    }

    if (window.Validation && destinationInput) {
      window.Validation.markField(destinationInput, true);
    }

    const days = daysSelect ? parseInt(daysSelect.value, 10) : 3;
    const budget = budgetSelect ? budgetSelect.value : 'standard';
    const travelStyle = styleSelect ? styleSelect.value : 'couple';

    // Collect selected interests
    const interests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
      interests.push(cb.value);
    });

    // UI Loading state
    if (emptyState) emptyState.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
    if (loadingState) loadingState.style.display = 'block';

    try {
      const response = await fetch('/api/ai/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          budget,
          travelStyle,
          interests
        })
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ AI');
      }

      const data = await response.json();
      const plan = data.plan;

      renderItinerary(plan);
      if (window.VietWander) {
        window.VietWander.showToast(`Đã tạo thành công lịch trình cho ${destination}!`, 'success');
      }
    } catch (error) {
      console.error('Planner error:', error);
      // Fallback display
      renderFallbackPlan(destination, days, budget);
      if (window.VietWander) {
        window.VietWander.showToast('Đã tạo lịch trình mẫu tiêu chuẩn cho bạn.', 'info');
      }
    } finally {
      if (loadingState) loadingState.style.display = 'none';
      if (resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  function renderItinerary(plan) {
    if (!resultContainer) return;

    const titleElem = document.getElementById('itinerary-title');
    const overviewElem = document.getElementById('itinerary-overview');
    const budgetElem = document.getElementById('itinerary-budget');
    const daysContainer = document.getElementById('itinerary-days-container');
    const packingContainer = document.getElementById('itinerary-packing-tips');

    if (titleElem) titleElem.textContent = `Lịch trình du lịch: ${plan.destination} (${plan.durationDays} Ngày)`;
    if (overviewElem) overviewElem.textContent = plan.overview || '';
    if (budgetElem) budgetElem.textContent = plan.estimatedBudget || 'Dự toán theo chi tiêu';

    // Render Days
    if (daysContainer && plan.itinerary && Array.isArray(plan.itinerary)) {
      daysContainer.innerHTML = plan.itinerary.map(item => `
        <div class="timeline-card">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="day-badge">Ngày ${item.day}: ${item.title || ''}</span>
            <span class="text-muted small">Dự chi: <strong>${item.estimatedCost || ''}</strong></span>
          </div>

          <div class="time-slot mt-3">
            <div class="time-slot-icon">🌅</div>
            <div>
              <strong class="d-block text-dark small text-uppercase">Buổi sáng</strong>
              <p class="mb-0 text-secondary">${item.morning || ''}</p>
            </div>
          </div>

          <div class="time-slot">
            <div class="time-slot-icon">☀️</div>
            <div>
              <strong class="d-block text-dark small text-uppercase">Buổi chiều</strong>
              <p class="mb-0 text-secondary">${item.afternoon || ''}</p>
            </div>
          </div>

          <div class="time-slot">
            <div class="time-slot-icon">🌙</div>
            <div>
              <strong class="d-block text-dark small text-uppercase">Buổi tối & Ẩm thực</strong>
              <p class="mb-0 text-secondary">${item.evening || ''}</p>
            </div>
          </div>

          ${item.recommendedEats && item.recommendedEats.length ? `
            <div class="mt-3 pt-3 border-top">
              <small class="text-muted d-block mb-1">🍜 Món ngon gợi ý:</small>
              <div class="d-flex flex-wrap gap-1">
                ${item.recommendedEats.map(eat => `<span class="badge bg-light text-dark border">${eat}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    // Render Packing Tips
    if (packingContainer && plan.packingTips && Array.isArray(plan.packingTips)) {
      packingContainer.innerHTML = plan.packingTips.map(tip => `
        <li class="mb-2 text-secondary">
          <span class="text-success me-2">✓</span>${tip}
        </li>
      `).join('');
    }
  }

  function renderFallbackPlan(destination, days, budget) {
    const sample = {
      destination,
      durationDays: days,
      estimatedBudget: `${(days * 1500000).toLocaleString('vi-VN')} VNĐ`,
      overview: `Hành trình khám phá trọn vẹn vẻ đẹp ${destination} với những điểm nhấn đặc sắc, văn hóa bản địa và các món ăn đặc sản không thể bỏ lỡ.`,
      itinerary: [
        {
          day: 1,
          title: 'Khởi hành & Thăm thú trung tâm',
          morning: `Đến ${destination}, làm thủ tục nhận phòng khách sạn, nghỉ ngơi lấy lại năng lượng.`,
          afternoon: `Khám phá các biểu tượng danh thắng nổi bật nhất trung tâm thành phố.`,
          evening: `Thưởng thức bữa tối ẩm thực địa phương và dạo phố ngắm cảnh đêm.`,
          recommendedEats: ['Đặc sản vùng miền', 'Cà phê truyền thống'],
          estimatedCost: '1.200.000 VNĐ'
        },
        {
          day: 2,
          title: 'Thiên nhiên & Trải nghiệm ngoài trời',
          morning: `Đón bình minh, tham quan các địa điểm sinh thái thiên nhiên hùng vĩ.`,
          afternoon: `Tham gia các hoạt động vui chơi, chụp ảnh lưu niệm tại các góc check-in tuyệt đẹp.`,
          evening: `Ăn tối hải sản hoặc món nướng đặc sắc, tự do dạo chợ đêm.`,
          recommendedEats: ['Lẩu đặc sản', 'Món ăn vặt đường phố'],
          estimatedCost: '1.500.000 VNĐ'
        }
      ],
      packingTips: [
        'Trang phục gọn nhẹ, thoải mái khi di chuyển',
        'Giày thể thao êm chân hoặc sandal chống trơn',
        'Kem chống nắng, mũ rộng vành, kính râm',
        'Sạc dự phòng và túi chống nước cho điện thoại'
      ]
    };
    renderItinerary(sample);
  }
});
