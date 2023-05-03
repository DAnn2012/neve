<?php
/**
 * Description Upsell Section
 *
 * Author:      Bogdan Preda <bogdan.preda@themeisle.com>
 * Created on:  20-12-{2021}
 *
 * @package neve/neve-pro
 */
namespace Neve\Customizer\Controls\React;

/**
 * Customizer section.
 *
 * @package    WordPress
 * @subpackage Customize
 * @since      4.1.0
 * @see        WP_Customize_Section
 */
class Upsell_Banner extends \WP_Customize_Control {
	/**
	 * Type of this section.
	 *
	 * @var string
	 */
	public $type = 'neve_upsell_banner';

	/**
	 * Upgrade URL.
	 *
	 * @var string
	 */
	public $url = '';

	/**
	 * Nonce.
	 *
	 * @var string
	 */
	public $nonce = '';

	/**
	 * Upsell text.
	 *
	 * @var string
	 */
	public $text = '';

	/**
	 * Upsell button text.
	 *
	 * @var string
	 */
	public $button_text = '';

	/**
	 * Upsell logo path.
	 *
	 * @var string
	 */
	public $logo_path = '';

	/**
	 * Upsell use logo.
	 *
	 * @var string
	 */
	public $use_logo = false;

	/**
	 * Gather the parameters passed to client JavaScript via JSON.
	 *
	 * @return array The array to be exported to the client as JSON.
	 * @since 4.1.0
	 */
	public function json() {
		$json               = parent::json();
		$json['url']        = $this->url;
		$json['nonce']      = $this->nonce;
		$json['text']       = $this->text;
		$json['buttonText'] = $this->button_text;
		$json['useLogo']    = $this->use_logo === true;
		$json['id']         = $this->id;
		$json['logoPath']   = ! empty( $this->logo_path ) ? $this->logo_path : get_template_directory_uri() . '/assets/img/dashboard/logo.svg';
		return $json;
	}

	/**
	 * Render template.
	 */
	protected function render() {
		?>
		<li id="customize-control-<?php echo esc_attr( $this->id ); ?>"
			data-slug="<?php echo esc_attr( $this->id ); ?>"
			class="customize-control customize-control-<?php echo esc_attr( $this->id ); ?>-control neve-upsell-banner">
		</li>
		<?php
	}
}
