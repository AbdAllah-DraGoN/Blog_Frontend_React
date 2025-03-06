export function truncateText(text, maxLength = 85) {
  if (text.length <= maxLength) {
    return text; // لا حاجة للقص
  }

  // ابحث عن آخر مسافة قبل الحد الأقصى
  let trimmedText = text.substring(0, maxLength);
  let lastSpaceIndex = trimmedText.lastIndexOf(" ");

  if (lastSpaceIndex !== -1) {
    return trimmedText.substring(0, lastSpaceIndex) + "..."; // إضافة "..." كإشارة للاقتصاص
  } else {
    return trimmedText + "..."; // في حالة عدم وجود مسافات، سيتم الاقتصاص عند الحد
  }
}
