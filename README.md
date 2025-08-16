# SmartRewrite - AI-Powered Text Rewriting Chrome Extension

SmartRewrite is a Chrome extension that uses AI to instantly rewrite selected text on any webpage, making it sound more professional and polished. Perfect for emails, documents, social media posts, and any text that needs a professional touch.

> This currently works on freshdesk domains because I work with a company (Afriex) where I need to sound more professional in my emails and it gave me the inspo to build this extension.

Check out the backend here: https://github.com/Octagon-simon/smart-rewrite-backend

## ✨ Features

- **Instant Text Rewriting**: Select any text on a webpage and rewrite it with AI
- **Context Menu Integration**: Right-click selected text to access rewriting
- **Professional Tone**: Transforms casual text into professional, polished content
- **Powered by Grok AI**: Uses advanced AI for intelligent text transformation
- **No External Websites**: Works directly on any webpage without redirects

## 🚀 Installation

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
2. **Right-click** and choose "Rewrite Text" from the context menu
3. **Wait** for the AI to process and rewrite your text
4. **See the result** - the original text is replaced with the professional version

## 🛠 Backend Setup

The extension requires a backend API for AI text processing.

### Option 1: Use Deployed Backend (Recommended)

The extension is configured to use a deployed Vercel backend with Grok AI integration.

### Option 2: Local Development

1. **Clone the repository**
   
   https://github.com/Octagon-simon/smart-rewrite-backend


2. **Install dependencies:**
   ```bash
    npm install
   ```
   
3. **Set up environment variables:**
    Create a `.env` file:
   ```bash
    XAI_API_KEY=your_xai_api_key_here
   ```

4. **Start the server:**
   ```bash
    npm start
   ```

5. **Update extension:** Change the API URL in `background.js` to `http://localhost:5000`

### Option 3: Deploy to Vercel

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

**Request:**
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

## 🆘 Support

If you encounter issues:
1. Check that the backend is running and accessible
2. Verify your API key is correctly set
3. Ensure the extension has necessary permissions
4. Check browser console for error messages

---

**Made with ❤️ by Octagon, for better writing everywhere**
