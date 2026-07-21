<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="mnemonic-form">
      <!-- Title Field -->
      <div class="form-group">
        <label for="title">Title (How to remember that...)</label>
        <input 
          v-model="form.title"
          type="text"
          id="title"
          placeholder="How to remember that..."
          required
        />
        <small>Start with 'How to remember that...'</small>
      </div>

      <!-- Category Field -->
      <div class="form-group">
        <label for="category">Category</label>
        <select v-model="form.category" id="category" required>
          <option value="">Select a category</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>Geography</option>
          <option>Grammar</option>
          <option>Spelling</option>
          <option>Pronunciation</option>
          <option>Foreign Languages</option>
          <option>History</option>
          <option>Biology</option>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Other</option>
        </select>
      </div>

      <!-- Description Field -->
      <div class="form-group">
        <label for="description">Short Description</label>
        <input 
          v-model="form.description"
          type="text"
          id="description"
          placeholder="Brief description of the mnemonic"
          required
        />
      </div>

      <!-- The Mnemonic Field -->
      <div class="form-group">
        <label for="mnemonic">The Mnemonic Explanation</label>
        <textarea 
          v-model="form.mnemonic"
          id="mnemonic"
          placeholder="Explain how the mnemonic works. Include examples."
          rows="6"
          required
        ></textarea>
      </div>

      <!-- Tags Field -->
      <div class="form-group">
        <label for="tags">Tags (comma-separated)</label>
        <input 
          v-model="form.tags"
          type="text"
          id="tags"
          placeholder="e.g., spelling, grammar, vocabulary"
        />
        <small>Tags help others find your mnemonic</small>
      </div>

      <!-- Email Field -->
      <div class="form-group">
        <label for="email">Your Email</label>
        <input 
          v-model="form.email"
          type="email"
          id="email"
          placeholder="your@email.com"
          required
        />
        <small>We'll contact you if we feature your mnemonic</small>
      </div>

      <!-- Submit Button -->
      <div class="form-actions">
        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          {{ isSubmitting ? 'Submitting...' : 'Submit Mnemonic' }}
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </form>

    <!-- Storage Summary -->
    <div v-if="savedMnemonics.length > 0" class="storage-summary">
      <h4>Recently Submitted (Saved Locally)</h4>
      <ul>
        <li v-for="(saved, idx) in savedMnemonics.slice(-3)" :key="idx">
          {{ saved.title }}
          <span class="date">{{ formatDate(saved.timestamp) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  title: '',
  category: '',
  description: '',
  mnemonic: '',
  tags: '',
  email: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const savedMnemonics = ref([])

// Load saved mnemonics from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('mnemonics_submissions')
  if (saved) {
    try {
      savedMnemonics.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error loading saved mnemonics:', e)
    }
  }
})

const submitForm = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Prepare the submission
    const submission = {
      ...form.value,
      tags: form.value.tags.split(',').map(t => t.trim()).filter(t => t),
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('mnemonics_submissions') || '[]')
    existing.push(submission)
    localStorage.setItem('mnemonics_submissions', JSON.stringify(existing))
    savedMnemonics.value = existing

    // Try to send email via Formspree (free email service)
    await fetch('https://formspree.io/f/xyzpqrst', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.value.title,
        category: form.value.category,
        description: form.value.description,
        mnemonic: form.value.mnemonic,
        tags: form.value.tags,
        email: form.value.email
      })
    }).catch(() => {
      // Formspree might not be available, but we already saved locally
      console.log('Email service unavailable, but mnemonic saved locally')
    })

    successMessage.value = '✓ Mnemonic submitted! Thank you. It will be reviewed before appearing on the site.'
    
    // Reset form
    form.value = {
      title: '',
      category: '',
      description: '',
      mnemonic: '',
      tags: '',
      email: ''
    }

    // Clear messages after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)

  } catch (error) {
    errorMessage.value = 'Error submitting mnemonic. Please try again.'
    console.error('Submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const formatDate = (timestamp: string) => {
  try {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return 'Unknown'
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.mnemonic-form {
  background-color: var(--stone-50);
  border: 1px solid var(--stone-200);
  border-radius: 0.5rem;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--stone-900);
  font-size: 0.95rem;
}

.form-group small {
  font-size: 0.75rem;
  color: var(--stone-600);
  margin-top: 0.25rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--stone-300);
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.95rem;
  background-color: white;
  color: var(--stone-900);
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--rainbow-blue);
  box-shadow: 0 0 0 3px rgba(27, 122, 161, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background-color: var(--stone-900);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--stone-700);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
  border-radius: 0.375rem;
  font-size: 0.95rem;
}

.error-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  font-size: 0.95rem;
}

.storage-summary {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--stone-100);
  border-radius: 0.375rem;
}

.storage-summary h4 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--stone-700);
  margin-bottom: 0.75rem;
}

.storage-summary ul {
  list-style: none;
  font-size: 0.875rem;
}

.storage-summary li {
  padding: 0.5rem 0;
  color: var(--stone-800);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 0.75rem;
  color: var(--stone-600);
}

@media (max-width: 640px) {
  .mnemonic-form {
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
