# SmartRewrite - AI-Powered Text Rewriting Chrome Extension

SmartRewrite is a Chrome extension that uses AI to instantly rewrite selected text on any webpage, making it sound more professional and polished. Perfect for emails, documents, social media posts, and any text that needs a professional touch.

> This currently works on freshdesk domains because I work with a company (Afriex) where I need to sound more professional in my emails and it gave me the inspo to build this extension.

Check out the backend here: https://github.com/Octagon-simon/smart-rewrite-backend

## ✨ Features

- **Instant Text Rewriting**: Select any text on a webpage and rewrite it with AI by right-clicking or using the keyboard shortcut `CTRL + SHIFT + Y` (default) or `CMD + SHIFT + Y` (mac)
- **Context Menu Integration**: Right-click selected text to access rewriting
- **Dual Language Support**: Rewrite text professionally or translate to French instantly
- **Professional Tone**: Transforms casual text into professional, polished content
- **Powered by Grok AI**: Uses advanced AI for intelligent text transformation
- **No External Websites**: Works directly on any webpage without redirects

## 🚀 Installation / Local Build

### For Users (Not live for general public yet!!!)

1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The SmartRewrite icon will appear in your Chrome toolbar

### For Developers

1. Clone this repository
2. Set up the backend (see Backend Setup below)
3. Load the extension in Chrome developer mode

## 📖 How to Use

1. **Select text** on any webpage (emails, documents, social posts, etc.)
2. **Right-click** and choose "Rewrite Text" from the context menu. Then choose your preferred language.
3. **Wait** for the AI to process and rewrite your text
4. **See the result** - the original text is replaced with the professional version

> If you have set a preferred language already, you can use the keyboard shortcut `CTRL + SHIFT + Y` (default) or `CMD + SHIFT + Y` (mac) to quickly rewrite the selected text.

## 🛠 Backend Setup

The extension requires a backend API for AI text processing.

### Option 1: Use Deployed Backend (Recommended)

The extension is configured to use a deployed Vercel backend with Grok AI integration.

### Option 2: Deploy to Vercel

1. **Push to GitHub** and connect to Vercel
2. **Add environment variable** `XAI_API_KEY` in Vercel project settings or add the xAI grok integration to your vercel account for automatic api key provision.
3. **Deploy** - Vercel will automatically handle the serverless functions
4. **Update extension** with your Vercel deployment URL

## 🔧 Technical Details

### Chrome Extension Structure

- `manifest.json` - Extension configuration and permissions
- `background.js` - Service worker handling API calls
- `content.js` - Content script for text selection and replacement
- `popup.html/js` - Extension popup interface
- `styles.css` - Popup styling

### Backend API

- **Framework**: Node.js serverless functions (Vercel compatible)
- **AI Provider**: xAI Grok-4 model
- **Endpoint**: `POST /api/rewrite` or `POST /rewrite`
- **Response Format**: `{ success: true, data: { response: "rewritten text" } }`

### API Usage

**Request (English):**

```json
{
  "content": "hey can u send me that file asap"
}
```

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "response": "Could you please send me that file at your earliest convenience?"
  }
}
```

**Request (French):**

```json
{
  "content": "hey can u send me that file asap",
  "translateToFrench": true
}
```

**Sample Response (French):**

```json
{
  "success": true,
  "data": {
    "response": "Pourriez-vous m’envoyer ce fichier dès que possible, s’il vous plaît ?"
  }
}
```

## 🔑 Environment Variables

- `XAI_API_KEY` - Your xAI API key for Grok AI access

## 📝 Development

### Local Testing

1. Start the backend server
2. Load the extension in Chrome
3. Test on any webpage with selectable text

### Debugging

- Check Chrome DevTools Console for extension logs
- Monitor Network tab for API calls
- Use `chrome://extensions/` to reload the extension

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💼 Commercial Use  

The code is open source, but if you’d like to use it for commercial purposes, we’d love to hear from you.  
Feel free to reach out via [email](mailto:ugorji757@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/simon-ugorji-57a6a41a3/).

## 🎯 Why Choose SmartRewrite?

**SmartRewrite stands out with these key advantages:**

- **Instant Integration**: Works directly on any webpage without leaving your current context
- **Context-Aware Rewriting**: Powered by Grok AI for intelligent, nuanced text transformation
- **Privacy-Focused**: Your text is processed securely without storing personal data
- **Lightning Fast**: Get professional rewrites in seconds, not minutes
- **Dual Language Support**: Rewrite text professionally or translate to French instantly
- **Developer-Friendly**: Open source with customizable backend options

## 🆘 Support

If you encounter issues:

1. Check that the backend is running and accessible
2. Verify your API key is correctly set
3. Ensure the extension has necessary permissions
4. Check browser console for error messages

---

**Made with ❤️ by Octagon, for better writing everywhere**
