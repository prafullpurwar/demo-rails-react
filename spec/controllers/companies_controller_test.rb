describe 'GET #index' do
  context 'with params[:role]' do
    it "populates an array of companies with role" do
      abc = FactoryBot.create(:company, name: 'ABC', role: :buyer)
      xyz = FactoryBot.create(:company, name: 'XYZ', role: :supplier)
      get :index, role: 'buyer'
      expect(assigns(:companies)).to match_array([abc])
    end
  end

  context 'without params[:role]' do
    it "populates an array of all companies" do
      abc = FactoryBot.create(:company, name: 'ABC', role: :buyer)
      xyz = FactoryBot.create(:company, name: 'XYZ', role: :supplier)
      get :index
      expect(assigns(:companies)).to match_array([abc,xyz])
    end
  end
end