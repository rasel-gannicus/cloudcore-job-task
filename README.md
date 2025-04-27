
# Cloud Core Product Showcase

A modern Next.js application for showcasing and ordering products with a seamless user experience.

## 🚀 Features

- Detailed product views with images
- Real-time order processing
- Responsive design for all devices
- Server-side rendering for optimal performance
- Redux state management for orders

## 🛠️ Technologies

- **Framework:** Next.js 14
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Type Checking:** TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <https://github.com/rasel-gannicus/cloudcore-job-task.git>
 ```


2. Install dependencies:
```bash
npm install
 ```

3. Create a .env file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://admin.refabry.com/api
 ```

4. Start the development server:
```bash
npm run dev
 ```

## 🔧 Environment Variables
The following environment variables are required:

- NEXT_PUBLIC_API_URL : Base URL for the API
## 📁 Project Structure
```plaintext
src/
├── app/                  # Next.js app directory
├── components/          # React components
├── redux/              # Redux store and slices
├── types/              # TypeScript definitions

 ```

## 🚗 API Routes
- GET /api/all/product/get : Fetch all products
- POST /api/public/order/create : Create new order

## 💻 Usage
1. Browse products on the home page
2. Click on a product to view details
3. Use the order form to place an order
4. View order confirmation
## 🤝 Contributing
1. Fork the repository
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request

